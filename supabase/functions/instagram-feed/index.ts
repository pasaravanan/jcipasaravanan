import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const FB_API = 'https://graph.facebook.com/v25.0'
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

interface InstagramConfig {
  access_token: string
  user_id: string
  app_id?: string
  app_secret?: string
  expires_at?: string | null
  updated_at?: string
}

function shouldRefresh(expiresAtIso: string | null | undefined): boolean {
  if (!expiresAtIso) return false
  const expiresTime = new Date(expiresAtIso).getTime()
  const thirtyDaysFromNow = Date.now() + 30 * 24 * 60 * 60 * 1000
  return expiresTime < thirtyDaysFromNow
}

async function exchangeFacebookToken(shortToken: string, appId: string, appSecret: string): Promise<{ token: string; expires_in?: number } | null> {
  try {
    const url = `${FB_API}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${encodeURIComponent(shortToken)}`
    const res = await fetch(url)
    if (!res.ok) {
      console.error('[instagram-feed] Token exchange failed:', await res.text())
      return null
    }
    const data = await res.json()
    return {
      token: data.access_token,
      expires_in: data.expires_in,
    }
  } catch (err) {
    console.error('[instagram-feed] Error exchanging token:', err)
    return null
  }
}

async function refreshInstagramBasicToken(existingToken: string): Promise<{ token: string; expires_in?: number } | null> {
  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(existingToken)}`
    const res = await fetch(url)
    if (!res.ok) {
      console.error('[instagram-feed] Token refresh failed:', await res.text())
      return null
    }
    const data = await res.json()
    return {
      token: data.access_token,
      expires_in: data.expires_in,
    }
  } catch (err) {
    console.error('[instagram-feed] Error refreshing basic token:', err)
    return null
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const dbClient = createClient(supabaseUrl, supabaseServiceKey)

  try {
    if (req.method === 'POST') {
      let body
      try {
        body = await req.json()
      } catch {
        body = {}
      }

      if (body.action === 'save-config' || body.action === 'get-config') {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader?.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Unauthorized: Missing Authorization header' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const token = authHeader.replace('Bearer ', '')
        const authClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
          global: { headers: { Authorization: authHeader } },
        })

        const { data: claimsData, error: claimsErr } = await authClient.auth.getClaims(token)
        if (claimsErr || !claimsData?.claims) {
          return new Response(JSON.stringify({ error: 'Unauthorized: Invalid credentials' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const userId = claimsData.claims.sub
        const { data: roleRow } = await dbClient
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .eq('role', 'admin')
          .maybeSingle()

        if (!roleRow) {
          return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
            status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        if (body.action === 'get-config') {
          const { data: row } = await dbClient
            .from('instagram_embeds')
            .select('post_url')
            .eq('display_order', -10)
            .eq('is_active', false)
            .maybeSingle()

          if (!row) {
            return new Response(JSON.stringify({ config: null }), {
              status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
          }

          const config = JSON.parse(row.post_url) as InstagramConfig
          const maskedConfig = {
            user_id: config.user_id,
            app_id: config.app_id || '',
            has_token: !!config.access_token,
            has_secret: !!config.app_secret,
            expires_at: config.expires_at,
            updated_at: config.updated_at,
          }

          return new Response(JSON.stringify({ config: maskedConfig }), {
            status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        if (body.action === 'save-config') {
          let { access_token, user_id, app_id, app_secret } = body

          if (!user_id) {
            return new Response(JSON.stringify({ error: 'user_id is required' }), {
              status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
          }

          const { data: existingRow } = await dbClient
            .from('instagram_embeds')
            .select('post_url')
            .eq('display_order', -10)
            .eq('is_active', false)
            .maybeSingle()

          let existingConfig: InstagramConfig | null = null
          if (existingRow) {
            try {
              existingConfig = JSON.parse(existingRow.post_url)
            } catch {}
          }

          if (!access_token || access_token === '••••••••••••••••••••') {
            if (existingConfig?.access_token) {
              access_token = existingConfig.access_token
            } else {
              return new Response(JSON.stringify({ error: 'access_token is required' }), {
                status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              })
            }
          }

          if (app_secret === 'KEEP_EXISTING') {
            app_secret = existingConfig?.app_secret || ''
          }

          let finalToken = access_token
          let expiresAt: string | null = existingConfig?.expires_at || null

          if (app_id && app_secret && access_token !== existingConfig?.access_token) {
            console.log('[instagram-feed] New token and app details provided. Attempting 60-day token exchange...')
            const exchanged = await exchangeFacebookToken(access_token, app_id, app_secret)
            if (exchanged) {
              finalToken = exchanged.token
              const seconds = exchanged.expires_in || 5184000
              expiresAt = new Date(Date.now() + seconds * 1000).toISOString()
              console.log('[instagram-feed] Token exchange successful. Expires on:', expiresAt)
            } else {
              console.warn('[instagram-feed] Token exchange failed. Saving provided token as-is.')
            }
          }

          const newConfig: InstagramConfig = {
            access_token: finalToken,
            user_id,
            app_id: app_id || '',
            app_secret: app_secret || '',
            expires_at: expiresAt,
            updated_at: new Date().toISOString(),
          }

          const { data: existingConfigRow } = await dbClient
            .from('instagram_embeds')
            .select('id')
            .eq('display_order', -10)
            .eq('is_active', false)
            .maybeSingle()

          let dbErr = null
          if (existingConfigRow) {
            const { error } = await dbClient
              .from('instagram_embeds')
              .update({ post_url: JSON.stringify(newConfig) })
              .eq('id', existingConfigRow.id)
            dbErr = error
          } else {
            const { error } = await dbClient
              .from('instagram_embeds')
              .insert({
                post_url: JSON.stringify(newConfig),
                display_order: -10,
                is_active: false,
              })
            dbErr = error
          }

          if (dbErr) {
            console.error('[instagram-feed] Database config save failed:', dbErr)
            return new Response(JSON.stringify({ error: dbErr.message }), {
              status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
          }

          return new Response(JSON.stringify({
            success: true,
            message: expiresAt ? 'Exchanged and saved 60-day token' : 'Token saved directly',
            expires_at: expiresAt,
          }), {
            status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }
      }
    }

    let activeToken = ''
    let activeUserId = ''
    let activeConfig: InstagramConfig | null = null

    const { data: dbConfigRow } = await dbClient
      .from('instagram_embeds')
      .select('post_url')
      .eq('display_order', -10)
      .eq('is_active', false)
      .maybeSingle()

    if (dbConfigRow) {
      try {
        activeConfig = JSON.parse(dbConfigRow.post_url) as InstagramConfig
        activeToken = activeConfig.access_token
        activeUserId = activeConfig.user_id
      } catch (e) {
        console.error('[instagram-feed] Failed to parse database config:', e)
      }
    }

    if (!activeToken || !activeUserId) {
      activeToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN') || ''
      activeUserId = Deno.env.get('INSTAGRAM_USER_ID') || ''
      const tokenExpiresOn = Deno.env.get('INSTAGRAM_TOKEN_EXPIRES_ON') || null
      
      if (activeToken && activeUserId) {
        activeConfig = {
          access_token: activeToken,
          user_id: activeUserId,
          expires_at: tokenExpiresOn,
        }
      }
    }

    if (!activeToken || !activeUserId) {
      return new Response(
        JSON.stringify({ error: 'Instagram Access Token and User ID are not configured yet.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (activeConfig && shouldRefresh(activeConfig.expires_at)) {
      console.log('[instagram-feed] Token is expiring within 30 days. Attempting auto-renewal...')
      let refreshed = null

      if (activeConfig.app_id && activeConfig.app_secret) {
        refreshed = await exchangeFacebookToken(activeToken, activeConfig.app_id, activeConfig.app_secret)
      } else {
        refreshed = await refreshInstagramBasicToken(activeToken)
      }

      if (refreshed) {
        const seconds = refreshed.expires_in || 5184000
        const newExpiry = new Date(Date.now() + seconds * 1000).toISOString()
        
        activeToken = refreshed.token
        activeConfig.access_token = refreshed.token
        activeConfig.expires_at = newExpiry
        activeConfig.updated_at = new Date().toISOString()

        await dbClient
          .from('instagram_embeds')
          .update({ post_url: JSON.stringify(activeConfig) })
          .eq('display_order', -10)
          .eq('is_active', false)

        console.log('[instagram-feed] Token auto-renewed successfully and updated in DB!')
      } else {
        console.warn('[instagram-feed] Token auto-renewal failed. Proceeding with existing token.')
      }
    }

    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || '12'
    const fetchUrl = `${FB_API}/${activeUserId}/media?fields=${FIELDS}&limit=${limit}&access_token=${activeToken}`

    const res = await fetch(fetchUrl)

    if (!res.ok) {
      const err = await res.json()
      console.error('[instagram-feed] Meta Graph API error response:', err)
      return new Response(
        JSON.stringify({ error: err.error?.message || 'Instagram API error', details: err }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()
    const posts = (data.data || []).map((item: any) => ({
      id: item.id,
      caption: item.caption || '',
      media_type: item.media_type,
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }))

    return new Response(JSON.stringify({ posts }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json', 
        'Cache-Control': 'public, max-age=600'
      }
    })
  } catch (err) {
    console.error('[instagram-feed] Server error:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})