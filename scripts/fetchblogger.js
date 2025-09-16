const https = require('https');
const fs = require('fs');

const url = 'https://www.giggiplay.online/feeds/posts/default';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        fs.writeFileSync('output.xml', data, 'utf8');
        console.log('RSS feed downloaded successfully!');
    });

}).on('error', (err) => {
    console.error('Error fetching RSS feed:', err.message);
    fs.writeFileSync('fetchBlogger.error.log', err.stack || err.message, 'utf8');
    process.exit(1);
});
