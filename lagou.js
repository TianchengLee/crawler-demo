const { Builder, By, Key, until } = require('selenium-webdriver');
// const { Options } = require('selenium-webdriver/chrome');

// const options = new Options()
// options.addArguments('Cookie=user_trace_token=20181130095945-889e634a-a79b-4b61-9ced-996eca44b107; X_HTTP_TOKEN=7470c50044327b9a2af2946eaad67653; _ga=GA1.2.2111156102.1543543186; _gid=GA1.2.1593040181.1543543186; LGUID=20181130095946-9c90e147-f443-11e8-87e4-525400f775ce; sajssdk_2015_cross_new_user=1; JSESSIONID=ABAAABAAAGGABCB5E0E82B87052ECD8CED0421F1D36020D; index_location_city=%E5%85%A8%E5%9B%BD; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1543543186,1543545866; LGSID=20181130104426-da2fc57f-f449-11e8-87ea-525400f775ce; PRE_UTM=; PRE_HOST=www.cnblogs.com; PRE_SITE=https%3A%2F%2Fwww.cnblogs.com%2F; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_%25E5%2589%258D%25E7%25AB%25AF%25E5%25BC%2580%25E5%258F%2591%3Fkd%3D%25E5%2589%258D%25E7%25AB%25AF%25E5%25BC%2580%25E5%258F%2591%26spc%3D1%26pl%3D%26gj%3D%26xl%3D%26yx%3D%26gx%3D%26st%3D%26labelWords%3Dlabel%26lc%3D%26workAddress%3D%26city%3D%25E5%2585%25A8%25E5%259B%25BD%26requestId%3D%26pn%3D1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221676257e1bd8cc-060451fc44d124-9393265-2359296-1676257e1be898%22%2C%22%24device_id%22%3A%221676257e1bd8cc-060451fc44d124-9393265-2359296-1676257e1be898%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; ab_test_random_num=0; _putrc=30FD5A7177A00E45123F89F2B170EADC; login=true; unick=%E5%A4%A9%E6%88%90; hasDeliver=0; gate_login_token=3e9da07186150513b28b29e8e74f485b86439e1fd26fc4939d32ed2660e8421a; _gat=1; SEARCH_ID=334cf2a080f44f2fb42841f473719162; LGRID=20181130110855-45ea2d22-f44d-11e8-87ee-525400f775ce; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1543547335; TG-TRACK-CODE=search_code');
// options.addArguments('user-agent="Mozilla/5.0 (iPod; U; CPU iPhone OS 2_1 like Mac OS X; ja-jp) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5F137 Safari/525.20')

// .setChromeOptions(options)

let currentPageNum = 1;
let maxPageNum = 5;
const url = 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?city=%E5%85%A8%E5%9B%BD&cl=false&fromSearch=true&labelWords=&suginput='
let driver = new Builder().forBrowser('chrome').build();

start()

async function start() {
  await driver.get(url);
  getData()
}

async function getData() {
  console.log(`正在获取第${currentPageNum}页的数据`)
  while (true) {
    let flag = true
    try {
      let els = await driver.findElements(By.className('con_list_item'))
      let results = []
      for (let i = 0; i < els.length; i++) {
        let el = els[i]
        let id = await el.getAttribute('data-companyid')
        let job = await el.findElement(By.tagName('h3')).getText()
        let area = await el.findElement(By.tagName('em')).getText()
        let money = await el.findElement(By.className('money')).getText()
        let link = await el.findElement(By.className('position_link')).getAttribute('href')
        let need = await el.findElement(By.css('.p_bot .li_b_l')).getText()
        let companyLink = await el.findElement(By.css('.company_name>a')).getAttribute('href')
        let companyName = await el.findElement(By.css('.company_name>a')).getText()
        let industry = await el.findElement(By.className('industry')).getText()
        let tags = await el.findElement(By.css('.list_item_bot .li_b_l')).getText()
        let welfare = await el.findElement(By.css('.list_item_bot .li_b_r')).getText()
        need = need.replace(/\d+k-\d+k/, '')
        // console.log(id, job, area, money, link, need, companyLink, industry, tags, welfare)
        results.push({
          id,
          job,
          area,
          money,
          link,
          need,
          companyLink,
          companyName,
          industry,
          tags,
          welfare,
        })
      }

      console.log(results)

      currentPageNum++
      if (currentPageNum <= maxPageNum) {
        await driver.findElement(By.className('pager_next')).click()
        // console.log(result, driver)
        await getData(driver)
        // driver.executeScript(`window.open('${url}')`)
      }
    } catch (e) {
      flag = false
    } finally {
      if (flag) {
        break
      }
    }

  }
}

// const {URL} = require('url')

// const options = new URL('https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?city=%E5%85%A8%E5%9B%BD&cl=false&fromSearch=true&labelWords=&suginput=');

// const options = {
//   hostname: 'www.lagou.com',
//   port: 443,
//   path: '/jobs/list_%E5%89%8D%E7%AB%AF?city=%E5%85%A8%E5%9B%BD&cl=false&fromSearch=true&labelWords=&suginput=',
//   method: 'GET',
//   headers: {
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//     'Accept-Encoding': 'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
//     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
//     'Connection': 'keep-alive',
//     'Cookie': 'user_trace_token=20181130095945-889e634a-a79b-4b61-9ced-996eca44b107; X_HTTP_TOKEN=7470c50044327b9a2af2946eaad67653; _ga=GA1.2.2111156102.1543543186; _gid=GA1.2.1593040181.1543543186; LGUID=20181130095946-9c90e147-f443-11e8-87e4-525400f775ce; sajssdk_2015_cross_new_user=1; JSESSIONID=ABAAABAAAGGABCB5E0E82B87052ECD8CED0421F1D36020D; index_location_city=%E5%85%A8%E5%9B%BD; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1543543186,1543545866; LGSID=20181130104426-da2fc57f-f449-11e8-87ea-525400f775ce; PRE_UTM=; PRE_HOST=www.cnblogs.com; PRE_SITE=https%3A%2F%2Fwww.cnblogs.com%2F; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_%25E5%2589%258D%25E7%25AB%25AF%25E5%25BC%2580%25E5%258F%2591%3Fkd%3D%25E5%2589%258D%25E7%25AB%25AF%25E5%25BC%2580%25E5%258F%2591%26spc%3D1%26pl%3D%26gj%3D%26xl%3D%26yx%3D%26gx%3D%26st%3D%26labelWords%3Dlabel%26lc%3D%26workAddress%3D%26city%3D%25E5%2585%25A8%25E5%259B%25BD%26requestId%3D%26pn%3D1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221676257e1bd8cc-060451fc44d124-9393265-2359296-1676257e1be898%22%2C%22%24device_id%22%3A%221676257e1bd8cc-060451fc44d124-9393265-2359296-1676257e1be898%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; ab_test_random_num=0; sm_auth_id=v6e99z7u633siv3o; _putrc=30FD5A7177A00E45123F89F2B170EADC; login=true; unick=%E5%A4%A9%E6%88%90; hasDeliver=0; gate_login_token=3e9da07186150513b28b29e8e74f485b86439e1fd26fc4939d32ed2660e8421a; _gat=1; TG-TRACK-CODE=index_search; LGRID=20181130110854-4519882e-f44d-11e8-8ca7-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1543547334; SEARCH_ID=5c8084bf98d1470387b14b181d411bb0',
//     'DNT': '1',
//     'Host': 'www.lagou.com',
//     'Referer': 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?px=default&city=%E5%85%A8%E5%9B%BD',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
//   }
// };

// const req = https.request(options, res => {
//   console.log('statusCode:', res.statusCode)
//   console.log('headers:', res.headers)
//   res.on('data', (d) => {
//     // process.stdout.write(d);
//     let sourceHtmlStr = d.toString()
//     // console.log(sourceHtmlStr)
//     const $ = cheerio.load(sourceHtmlStr)
//     console.log($.html())
//   })
// })

// req.on('error', (e) => {
//   console.error(e);
// });
// req.end();