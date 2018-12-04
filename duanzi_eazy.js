const https = require('https')
const cheerio = require('cheerio')
const download = require('download')

let currentPage = 1

const options = {
  hostname: 'www.haha.mx',
  port: 443,
  path: '/good/day/' + currentPage,
  method: 'GET'
};


let imgUrls = []

const req = https.request(options, (res) => {
  // console.log('statusCode:', res.statusCode);
  // console.log('headers:', res.headers);

  let chunkArr = []
  res.on('data', (chunk) => {
    // process.stdout.write(chunk);
    chunkArr.push(chunk)
  });

  res.on('end', () => {
    let result = Buffer.concat(chunkArr).toString()
    // console.log(result)
    let $ = cheerio.load(result)
    $('.joke-list-item-main .joke-main-content .joke-main-img').each((index, item) => {
      // console.log(index)
      // console.log($(item).attr('src'))
      console.log($(item).data('original'))
      imgUrls.push('https:' + $(item).data('original'))
    })

    Promise.all(imgUrls.map(x => download(x, 'pics'))).then(() => {
      console.log('files downloaded!');
    });
  })
});


req.end();