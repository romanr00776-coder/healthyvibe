const https = require('https');
const fs = require('fs');
const url = 'https://www.giggiplay.online/feeds/posts/default';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { fs.writeFileSync('output.xml', data); });
});
