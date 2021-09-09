const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config()

puppeteer.use(StealthPlugin());

class GoogleMeet {
    constructor(inviteLink, browser) {
        this.inviteLink = inviteLink;
        this.loginLink = "https://accounts.google.com/";
        this.browser = browser;
    }

    async login () {
        const page = await this.browser.newPage();
        const navigationPromise = page.waitForNavigation();
    
        await page.goto(this.loginLink);
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
        await page.close();
    }
    
    async joinMeet() {
        const page = await this.browser.newPage();
    
        await page.waitFor(1000);
        await page.goto(this.inviteLink.href);
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
}

module.exports = GoogleMeet;
