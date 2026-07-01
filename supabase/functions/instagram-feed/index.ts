const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

// Use Facebook Graph API endpoint with Page Access Token for Instagram Business accounts
const FB_API = 'https://graph.facebook.com/v25.0'
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // INSTAGRAM_ACCESS_TOKEN = Facebook Page Access Token (from /me/accounts)
    // INSTAGRAM_USER_ID = Instagram Business Account ID (numeric)
    const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    const userId = Deno.env.get('INSTAGRAM_USER_ID')

    if (!token || !userId) {
      return new Response(
        JSON.stringify({ error: 'INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID must be set in Supabase secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || '12'

    // Fetch latest media using Facebook Graph API (required for Instagram Business accounts)
    const res = await fetch(
      `${FB_API}/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`
    )

    if (!res.ok) {
      const err = await res.json()
      return new Response(
        JSON.stringify({ error: err.error?.message || 'Instagram API error', details: err }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()

    // Normalize posts: use thumbnail_url as poster for VIDEO/REELS
    const posts = (data.data || []).map((item: any) => ({
      id: item.id,
      caption: item.caption || '',
      media_type: item.media_type, // IMAGE | VIDEO | REELS | CAROUSEL_ALBUM
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }))

    return new Response(JSON.stringify({ posts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
