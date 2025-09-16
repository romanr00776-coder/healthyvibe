// scripts/fetchBlogger.js
const axios = require("axios");
const fs = require("fs-extra");

async function main() {
  try {
    const url = "https://giggiplay.online/feeds/posts/default?alt=json";
    const res = await axios.get(url);

    const entries = res.data.feed.entry || [];

    // HTML banate hain
    let postsList = entries.map(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === "alternate").href;
      return `<li><a href="${link}" target="_blank">${title}</a></li>`;
    }).join("");

    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Blogger Posts</title>
        </head>
        <body>
          <h1>Blogger → GitHub Pages</h1>
          <ul>
            ${postsList}
          </ul>
        </body>
      </html>
    `;

    // Save files
    await fs.outputFile("index.html", html);
    await fs.outputFile("data/posts.json", JSON.stringify(res.data, null, 2));

    console.log("✅ Blogger data fetch success!");
  } catch (err) {
    console.error("❌ Error fetching Blogger:", err);
    process.exit(1);
  }
}

main();
