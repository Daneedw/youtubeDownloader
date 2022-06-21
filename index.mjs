import fs from "fs";
import ytdl from "ytdl-core";

import ytpl from "ytpl";

const playlist = await ytpl("PLpePgEi-vLu8GODHPPhud4VylnIQaIdxk");
const videos = playlist.items;

let current = 0;
const timer = setInterval(() => {
  if (current >= videos.length) {
    clearInterval(timer);
  }
  if (current < videos.length) {
    console.log(current);
    let dir = `Playlist`;

    console.log(dir);
    let title = videos[current].title;

    let file = `${dir}/${title.replace(/\\/g, "&").replace(/\//g, "&")}.mp4`;
    while (fs.existsSync(file)) {
      console.log(`${file} exists already!`);

      current++;
      title = videos[current].title;
      file = `${dir}/${title
        .replace(/\\/g, "&")
        .replace(/\//g, "&")
        .replace(/\?/g, "_")
        }.mp4`;
    }
    console.log(`downloading ${title} as ${file}.mp4`);

    try {
      ytdl(`${videos[current].shortUrl}`).pipe(fs.createWriteStream(file));
    } catch (error) {
      fs.appendFile(
        "log.txt",
        `${error}
        ${file} unable to download`
      );
      current++;
    }

    current++;
  }
}, 11000);
