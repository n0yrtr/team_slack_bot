const puppeteer = require('puppeteer');
const constant = require('./const.js');


exports.screenshot = function() {
  return (
    async () => {
    headless = true
    
    try {
    const browser = await puppeteer.launch({
        headless: headless,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto("https://calendar.google.com/calendar");
   
    //ヘッドレスブラウザのときとそうじゃないときで、Googleのログイン画面のDOMが変わるため切り分け。
    if (headless) {
      selectorMailInput = '#Email';
      selectorNextButton = '#next';
      selectorPasswordInput = '#password';
      selectorSubmit = '#submit';
    } else {
      selectorMailInput = '#identifierId';
      selectorNextButton = '#identifierNext > div > button > div.VfPpkd-RLmnJb';
      selectorPasswordInput = '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input';
      selectorSubmit = '#passwordNext > div > button > div.VfPpkd-Jh9lGc';
    }
    await page.waitForSelector(selectorMailInput);
    await page.type(selectorMailInput, constant.MAIL_ADDRESS());
   
    await Promise.all([
        page.click(selectorNextButton),
        page.waitForSelector(selectorPasswordInput, { timeout: 60000 })
    ]);
    await page.waitForTimeout(1000); 
    await page.type(selectorPasswordInput, constant.PASSWORD());
    await page.click(selectorSubmit);
    
    await page.waitForSelector('body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T > div.qXIcZc.ZtL5hd > div.TBA7qc > div.J09ahd.TanRXd.l94Mhe > div.YxiWic.UMArVc > div > span > div > div.d1dlne.WvJxMd > div.rFrNMe.Ax4B8.ULpymb.zKHdkd.Tyc9J > div.aCsJod.oJeWuf > div > div.Xb9hP > input');
    await page.waitForTimeout(10000);
    // チームメンバーのメールアドレスを入力
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com"); 
    await selectCalendar(page, "aaaaa@gmail.com");
    await selectCalendar(page, "aaaaa@gmail.com");
     
    
    await page.setViewport({
        width: 1680,
        height: 1320
    });
    await page.waitForTimeout(1000);
    let path = './calendar.png'
    await page.screenshot({path: path , fullPage: true});
    await browser.close();
    return path;
    } catch (err) {
        throw err
    }
  })();
  
};

async function selectCalendar(page, mailAddress) {
  await page.type('body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T > div.qXIcZc.ZtL5hd > div.TBA7qc > div.J09ahd.TanRXd.l94Mhe > div.YxiWic.UMArVc > div > span > div > div.d1dlne.WvJxMd > div.rFrNMe.Ax4B8.ULpymb.zKHdkd.Tyc9J > div.aCsJod.oJeWuf > div > div.Xb9hP > input', mailAddress)
  await page.waitForSelector('.u3WVdc.jBmls > div > div')
  await page.waitForTimeout(2000)
  await page.click('.u3WVdc.jBmls > div > div');  
}

async function successCallback(result) {
  console.log("SUCCESS!!!!: " + result);
}

async function failureCallback(error) {
  console.log("ERROR!!!!: " + error);
}

// nodeで直接実行するときは以下をコメントアウトを外して、　$node calendar_screen_shot.js　で実行
// this.screenshot().then(successCallback, failureCallback);

