const { program } = require('commander');
const ora = require('ora');
const { download, downloader } = require('./downloader');

const spinner = ora('Downloading file...').start();
spinner.color = 'yellow';
spinner.text = 'Downloading...';

program.version('1.0.0').description('A simple node-cli youtube downloader');

program
    .command('ytd')
    .requiredOption('-l, --link <link>', 'A youtube video link or id')
    .option('-o, --output [output]', 'Name of the output downloaded file')
    .action((cmObj) => {
        let {link, output} = cmObj;
        download(link, output)
            .then(finishedObj => {
                spinner.succeed(`Finished downloading...${finishedObj.videoTitle}`)
            }).catch(err => {
                spinner.fail('Could not download that file. An Error Occured');
                console.error(err);
            });
        downloader.on('progress', progressObj => {
            spinner.text = `${Number(progressObj.progress.percentage).toFixed(2)}% done`;
        })
    });
program.parse(process.argv);