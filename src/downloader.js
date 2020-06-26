const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const { isURL } = require('./helpers');
let url = require('url');

const downloader = new YoutubeMp3Downloader({
    ffmpegPath: process.env.FFMPEG_PATH_1,
    outputPath: process.env.OUTPUT_PATH,
    youtubeVideoQuality: 'highest',
    queueParallelism: 3,
    progressTimeout: 5000
});

module.exports = {
    download(videoIdOrLink, fileName) {
        return new Promise((resolve, reject) => {
            if(!videoIdOrLink)
                throw new Error('Please enter a valid video id or link');
            let videoId = videoIdOrLink;
            if(isURL(videoIdOrLink)) {
                let urlQueryObj = url.parse(videoIdOrLink, true).query;
                videoId = urlQueryObj.v;
            }
            downloader.download(videoId, fileName);
            downloader.on('finished', (err, data) => resolve(data));
            downloader.on('error', err => reject(err));
        });
    },
    downloader
}