import fs from "fs";
import ytdl from "ytdl-core";

import ytpl from "ytpl";
//example url
//https://www.youtube.com/playlist?list=PLpePgEi-vLu8GODHPPhud4VylnIQaIdxk
const playlist = await ytpl("PLpePgEi-vLu9euPlaqf1vABjBYVWBrjQp", {});
const videos = playlist.items;

let current = 0;
// const timer = setInterval(downloadVideo, 20000);
console.table(videos.map(video => ({title:video.title, duration:video.duration})));

let length =0;
videos.forEach(video => length+=video.durationSec);

console.log("total of " + (length/3600).toFixed(2) + "hrs");
downloadVideo();


function replaceValidString(str){

 return str.replace(/\\/g, "&")
  .replace(/\//g, "&")
  .replace(/\?/g, "_")
  .replace(/\|/g, "_")
  .replace(/"/g, "_")

}
function downloadVideo() {

  if (current >= videos.length) {
process.exit();
    
  }
  if (current < videos.length) {
    console.log(current);
    let dir = `Playlist`;

    console.log(dir);
    let title = videos[current].title;

    let file = `${dir}/${replaceValidString(title)}.mp4`;
    while (fs.existsSync(file)) {
      console.log(`${file} exists already!`);

      current++;
      title = videos[current].title;
      file = `${dir}/${replaceValidString(title)}.mp4`;
    }
    console.log(`downloading ${title} as ${file}.mp4`);

    //added audio and video filter, some videos don't have both, so this should fix that issue.
    try {
      let writeStream = fs.createWriteStream(file)
      ytdl(`${videos[current].shortUrl}`, {filter:"audioandvideo"}).pipe(writeStream);

      writeStream.on("close", () =>  {
        console.log(`finished: ${file}`)
        downloadVideo();
        
    
    });
      
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
}

