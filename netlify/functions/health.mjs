import { createClient } from '@supabase/supabase-js'

export const handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    )

    const { error } = await supabase.from('videos').select('id').limit(1)

    if (error) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ status: 'error', database: 'disconnected' }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'ok', database: 'connected' }),
    }
  } catch {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ status: 'error', database: 'disconnected' }),
    }
  }
}
