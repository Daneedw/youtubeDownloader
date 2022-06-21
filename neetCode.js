const fs = require("fs");
const ytdl = require("ytdl-core");
const videos = require("./videos");



let current = 0;
const timer = setInterval(() => {
  if (current >= videos.length) {
    clearInterval(timer);
  }
  if (current < videos.length) {
    console.log(current);
    let dir = `${videos[current].folder}`;
    console.log(dir);
    console.log(`${videos[current].solution}`);
    console.log(`${videos[current].problem}.mp4`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    ytdl(`${videos[current].solution}`).pipe(
      fs.createWriteStream(`${dir}/${videos[current].problem}.mp4`)
    );
  }
  current++;
}, 31000);
