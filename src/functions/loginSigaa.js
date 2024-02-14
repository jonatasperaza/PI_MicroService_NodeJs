const initBrowser = require('./initBrowser');
require('dotenv').config();

const URL_LOGIN = process.env.URL_LOGIN;

/**
 * Inicializa um navegador Puppeteer.
 * @param {string} user - Usuário do SIGAA.
 * @param {string} pass - Senha do SIGAA.
 * @return {Promise<Object>} Objeto com o browser e a página logada no SIGAA.
 */
async function loginSigaa(user, pass) {
  const {page, pages, browser} = await initBrowser();
  await page.goto(URL_LOGIN, {
    waitUntil: 'load',
    timeout: 0,
  });
  await page.type('input[type="text"]', user, {delay: 100});
  await page.type('input[type="password"]', pass, {delay: 100});
  await page.click('button');
  await page.click('input[type="submit"]');
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  await page.waitForSelector('.ui-link-inherit');

  return {
    page,
    pages,
    browser,
  };
};

module.exports = loginSigaa;
