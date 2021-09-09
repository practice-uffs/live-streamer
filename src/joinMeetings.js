const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const GoogleMeet = require('./meet');
require('dotenv').config()

puppeteer.use(StealthPlugin());

async function joinMeeting (meetUrl) {
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

        const meet = new GoogleMeet(inviteLink, browser);

        await meet.login();
        await meet.joinMeet(inviteLink);

    } catch (error) {
        throw Error("Unable to access the meeting. Check url and try again.");
    }
}

module.exports = joinMeeting;
