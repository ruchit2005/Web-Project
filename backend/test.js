const fs = require('fs');
const { getJson } = require("serpapi");


getJson({
    engine: "google_lens",
    url: "https://th.bing.com/th/id/OIP.RclgOCmXMr2z57kL5O3onwHaFJ?rs=1&pid=ImgDetMain",
    api_key: "e46eb16e06b86f316f7c4fcb0059c24f949e1cec889d9dcbdfc087f140452d40",
}, (json) => {
    if (json.error) {
        console.error("SerpAPI Error:", json.error);
        res.status(500).send(`SerpAPI Error: ${json.error.message}`);
    } else {
        console.log("Visual matches:", json.visual_matches);
        fs.writeFileSync('lensdata.json', JSON.stringify(json.visual_matches));
        res.status(200).send("Data fetched successfully");
    }
});