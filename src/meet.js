const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config()

puppeteer.use(StealthPlugin());

async function accessGoogleMeet (meetUrl) {
    try {
        const browserOptions = {
            headless: false,
            args: [ '--use-fake-ui-for-media-stream' ]
        };

        const permissions = ['camera', 'microphone'];
        const inviteLink = new URL(meetUrl);

        const browser = await puppeteer.launch(browserOptions);
        const context = browser.defaultBrowserContext();

        await context.clearPermissionOverrides();
        await context.overridePermissions(inviteLink.origin, permissions);

        const page = await browser.newPage();

        await googleAccountLogin(page);
        await joinMeet(page, inviteLink);

    } catch (error) {
        throw Error("Unable to access the meeting. Check url and try again.");
    }
}

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
    await page.waitFor(2000);


    await navigationPromise;
    await page.type('input[type="password"]', process.env.GOOGLE_PASSWORD);
    await page.waitForSelector('#passwordNext');
    await page.click('#passwordNext');

    await page.waitFor(1000);
}

async function joinMeet(page, inviteLink) {
    const navigationPromise = page.waitForNavigation()

    await page.waitFor(1000);
    await page.goto(inviteLink.href);
    await page.waitFor(3000);
   
    // Turn off the microphone
    await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d');
    await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d');

    // Turn off the camera
    await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d');
    await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d');

    // Join the meeting
    await page.waitForSelector('span.l4V7wb.Fxmcue');
    await page.waitFor(5000);

    await page.click('span.l4V7wb.Fxmcue');
}

module.exports = accessGoogleMeet
