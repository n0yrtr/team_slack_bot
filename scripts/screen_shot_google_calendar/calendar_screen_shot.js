const puppeteer = require('puppeteer');
const constant = require('./const.js');


exports.screenshot = function() {
  return (

    async () => {
    try {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto("https://calendar.google.com/calendar");
    await page.type("#identifierId", constant.MAIL_ADDRESS());

    await Promise.all([
	page.click('#identifierNext > div > button > div.VfPpkd-RLmnJb'),
        page.waitForSelector('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', { timeout: 60000 })
    ]);
    await page.waitFor(1000); 
    await page.type("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input", constant.PASSWORD());
    
    await page.click('#passwordNext > div > button > div.VfPpkd-Jh9lGc');
    
    
    await page.waitForSelector('body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T > div.qXIcZc.ZtL5hd > div.TBA7qc > div.J09ahd.TanRXd.l94Mhe > div.YxiWic.UMArVc > div > span > div > div.d1dlne.WvJxMd > div.rFrNMe.Ax4B8.ULpymb.zKHdkd.Tyc9J > div.aCsJod.oJeWuf > div > div.Xb9hP > input');
    await page.waitFor(10000);
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com"); 
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com");
     
    
    await page.setViewport({
        width: 1680,
        height: 1320
    });
    await page.waitFor(1000);
    let path = './calendar.png'
    await page.screenshot({path: path , fullPage: true});
    return [path, browser];
    } catch (err) {
        throw [err, browser]
    }
  })();
  
};

async function selectCalendar(page, mailAddress) {
  await page.type('body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T > div.qXIcZc.ZtL5hd > div.TBA7qc > div.J09ahd.TanRXd.l94Mhe > div.YxiWic.UMArVc > div > span > div > div.d1dlne.WvJxMd > div.rFrNMe.Ax4B8.ULpymb.zKHdkd.Tyc9J > div.aCsJod.oJeWuf > div > div.Xb9hP > input', mailAddress)
  await page.waitForSelector('.u3WVdc.jBmls > div > div')
  await page.waitFor(2000)
  await page.click('.u3WVdc.jBmls > div > div');  
}

async function successCallback(result) {
  console.log("SUCCESS!!!!: " + result[0]);
  await result[1].close();
}

async function failureCallback(error) {
  console.log("ERROR!!!!: " + error[0]);
  await error[1].close
}

this.screenshot().then(successCallback, failureCallback);
