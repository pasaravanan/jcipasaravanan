import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const INSTAGRAM_API = 'https://graph.instagram.com/v25.0'
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    const userId = Deno.env.get('INSTAGRAM_USER_ID') // numeric IG Business/Creator user ID

    if (!token || !userId) {
      return new Response(
        JSON.stringify({ error: 'INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID must be set in Supabase secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || '12'

    // Fetch latest media from the user's profile
    const res = await fetch(
      `${INSTAGRAM_API}/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`
    )

    if (!res.ok) {
      const err = await res.json()
      return new Response(
        JSON.stringify({ error: err.error?.message || 'Instagram API error' }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()

    // Normalize: for VIDEO/REEL use thumbnail_url as poster; filter out STORY/CAROUSEL_ALBUM if desired
    const posts = (data.data || []).map((item: any) => ({
      id: item.id,
      caption: item.caption || '',
      media_type: item.media_type, // IMAGE | VIDEO | REELS | CAROUSEL_ALBUM
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || item.media_url, // thumbnail_url only for VIDEO/REELS
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
