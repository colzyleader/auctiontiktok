module.exports = (req, res) => {
  // TikTok verification challenge (GET)
  if (req.method === 'GET') {
    const challenge = req.query.challenge;
    if (challenge) {
      return res.status(200).json({ challenge });
    }
    return res.status(200).json({ status: 'CoinDrop webhook active' });
  }

  // Receive gift events (POST)
  if (req.method === 'POST') {
    try {
      const event = req.body || {};
      if (event.event === 'live.gift') {
        const name   = (event.data && event.data.user && event.data.user.display_name) || 'Anonymous';
        const coins  = (event.data && event.data.gift && event.data.gift.coin_count)   || 0;
        console.log('Gift: ' + name + ' sent ' + coins + ' coins');
      }
    } catch (e) {}
    return res.status(200).json({ received: true });
  }

  return res.status(200).json({ status: 'ok' });
};
