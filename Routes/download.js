const puppeteer = require("puppeteer");

async function doWork(req, res) {
  var url =
    "https://apkcombo.com/en-in/apk-downloader/?device=&arches=&sdkInt=&sa=1&lang=en&dpi=480&q=" +
    req.query.q;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });
  //#apkcombo-server-tab > div > a
  try {
    await page.waitForSelector("#apkcombo-server-tab > div");
    let element = await page.$("#apkcombo-server-tab > div > a");
    let value = await page.evaluate((el) => el.getAttribute("href"), element);
    browser.close();
    res.json({ status: "Success", downloadUrl: value });
  } catch (error) {
    res.json({ status: "App not found..."});
  }
}

module.exports.doWork = doWork;
