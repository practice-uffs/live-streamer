const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function googleAccountLogin (page) {
    const loginLink = "https://accounts.google.com/";
    const navigationPromise = page.waitForNavigation();

    await page.goto(loginLink);
    await navigationPromise;

    await page.waitForSelector('input[type="email"]');
    await page.click('input[type="email"]');
    await navigationPromise;
    await page.type('input[type="email"]', process.env.GOOGLE_EMAIL);

    await page.waitForSelector('#identifierNext');
    await page.click('#identifierNext');
    await page.waitFor(1000);


    await navigationPromise;
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.waitForSelector('#passwordNext');
    await page.click('#passwordNext');

    await page.waitFor(1000);
}

