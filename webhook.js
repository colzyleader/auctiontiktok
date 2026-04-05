// CoinDrop — TikTok Webhook Handler (Vercel Edge Runtime)

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);

  // ── GET: TikTok ownership verification challenge
  if (req.method === 'GET') {
    const challenge = url.searchParams.get('challenge');
    if (challenge) {
      return new Response(JSON.stringify({ challenge }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ status: 'CoinDrop webhook active' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ── POST: Receive TikTok LIVE gift events
  if (req.method === 'POST') {
    try {
      const event = await req.json();
      console.log('TikTok event:', event?.event || 'unknown');

      if (event?.event === 'live.gift') {
        const gifterName = event?.data?.user?.display_name || 'Anonymous';
        const coinAmount = event?.data?.gift?.coin_count   || 0;
        console.log(`Gift: ${gifterName} sent ${coinAmount} coins`);
        // TODO: Push to your board via websocket/database here
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
