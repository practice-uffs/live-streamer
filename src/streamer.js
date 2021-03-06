const puppeteer = require('puppeteer');

async function login(browser, config) {
    const page = await browser.newPage();

    page.setDefaultTimeout(0);

    await page.goto('https://professor.uffs.edu.br/');

    await page.type('[type=text][name=j_username]', config.auth.user + '');
    await page.type('[type=password][name=j_password]', config.auth.password + '');
    await page.click('[type=submit][value=Entrar]');

    const [error] = await page.$x("//body[contains(., 'não conferem')]");

    if (error) {
        throw 'Usuário ou senha de acesso invalidos';
    }

    // Login deu certo.
    await page.waitForSelector('form[action$="inicio.xhtml"]');
}

async function launch(config) {
    const browser = await puppeteer.launch(config);
    try {
        await login(browser, config);
    } catch (error) {
        browser.close();
        throw error;
    }
    return browser;
}

async function newTab() {
    var page = await streamer.browser.newPage();
    page.setDefaultTimeout(0);

    return page;
}

async function create(config) {
    streamer.browser = await launch(config);
    streamer.config = config;

    return streamer;
}

async function destroy(config) {
    streamer.browser.close();
}

var streamer = {
    browser: null,
    config: null,
    newTab: newTab
};

module.exports = {
    create,
    destroy,
}