const https = require('https');

function searchYoutube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        const matches = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          matches.push(match[1]);
        }
        const unique = [...new Set(matches)];
        resolve(unique.slice(0, 4));
      });
    }).on('error', () => resolve([]));
  });
}

function verifyVideo(id) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const j = JSON.parse(data);
            resolve({ id, valid: true, title: j.title, author: j.author_name });
          } catch (e) {
            resolve({ id, valid: false });
          }
        } else {
          resolve({ id, valid: false });
        }
      });
    }).on('error', () => resolve({ id, valid: false }));
  });
}

(async () => {
  const queries = [
    'Kali Linux commands tutorial',
    'Burp Suite beginner tutorial',
    'Python cybersecurity tutorial',
    'Digital forensics investigation case study',
    'SOC analyst day in the life training',
    'Linux for hackers full tutorial',
    'Cryptography RSA AES tutorial',
    'Phishing email analysis tutorial'
  ];

  const results = {};
  for (const q of queries) {
    const ids = await searchYoutube(q);
    const verifiedList = [];
    for (const id of ids) {
      const v = await verifyVideo(id);
      if (v.valid) {
        verifiedList.push(v);
        console.log(`[VERIFIED] ${v.id} | ${v.author} | ${v.title}`);
      }
    }
    results[q] = verifiedList;
  }

  console.log('\n--- ALL VERIFIED PART 2 ---');
  console.log(JSON.stringify(results, null, 2));
})();
