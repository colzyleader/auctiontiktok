// CoinDrop — TikTok OAuth Callback Handler (Vercel Edge Runtime)

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const code  = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return Response.redirect(new URL('/?error=tiktok_auth_failed', url.origin));
  }

  if (code) {
    // TODO: Exchange code for access token here
    return Response.redirect(new URL('/?connected=true', url.origin));
  }

  return new Response(JSON.stringify({
    status: 'CoinDrop callback active',
    message: 'TikTok OAuth callback ready'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
