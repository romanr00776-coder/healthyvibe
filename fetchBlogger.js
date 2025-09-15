const axios = require('axios');
const fs = require('fs-extra');

const feedUrl = 'https://www.giggiplay.online/feeds/posts/default?alt=json&max-results=10';

async function main() {
  try {
    const res = await axios.get(feedUrl);
    const posts = res.data.feed.entry;

    let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Giggiplay Posts</title></head><body>';
    posts.forEach(post => {
      const title = post.title.$t;
      const content = post.content.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;
      html += `<h2><a href="${link}">${title}</a></h2>${content}<hr>`;
    });
    html += '</body></html>';

    fs.outputFileSync('index.html', html);
    console.log('index.html updated!');
  } catch (err) {
    console.error(err);
  }
}

main();
