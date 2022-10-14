const fs = require("fs");
const ytdl = require("ytdl-core");
const videos = require("./videos");



let current = 0;
download();

function download(){
  if (current >= videos.length) {
    process.exit();
  }
  if (current < videos.length) {
    console.log(current);
    let dir = `NeetCode/${videos[current].folder}`;
    console.log(dir);
    console.log(`${videos[current].solution}`);
    console.log(`${videos[current].problem}.mp4`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let writeStream = fs.createWriteStream(`${dir}/${videos[current].problem}.mp4`)
    ytdl(`${videos[current].solution}`).pipe(writeStream);
    writeStream.on("close", () =>  {
      download();
  
  });
  }
  current++;
};
