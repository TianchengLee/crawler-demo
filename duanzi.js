const { Builder, By, Key, until } = require('selenium-webdriver')

let currentPageNum = 1
let maxPage = 5
let url = 'https://www.haha.mx/pic/new/'
let driver = new Builder().forBrowser('chrome').build()
let imgUrls = []

start()

async function start() {
  await getData()
  console.log(imgUrls)
}

async function getData() {
  await driver.get(url + currentPageNum)
  let els = await driver.findElements(By.css('.joke-main-img-wrapper .joke-main-img'))
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let imgUrl = await el.getAttribute('data-original')
    imgUrl = 'https:' + imgUrl
    imgUrls.push(imgUrl)
  }
  currentPageNum++
  if (currentPageNum <= maxPage) {
    await getData()
  }
}