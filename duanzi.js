const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')
const download = require('download')

let options = new Options().addArguments('--headless')

let currentPageNum = 1
let maxPage = 10
let url = 'https://www.haha.mx/pic/new/'
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

start()

async function start() {
  await getData()
}

async function getData() {
  let imgUrls = []
  driver.get(url + currentPageNum)
  let els = await driver.findElements(By.css('.joke-main-img-wrapper .joke-main-img'))
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let imgUrl = await el.getAttribute('data-original')
    imgUrl = 'https:' + imgUrl
    imgUrls.push(imgUrl)
  }
  downloadImg(imgUrls)
  currentPageNum++
  if (currentPageNum <= maxPage) {
    await getData()
  }
}

function downloadImg(arr) {
  Promise.all(arr.map(x => download(x, 'pics'))).then(() => {
    console.log('files downloaded!');
  });
}