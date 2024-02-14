const puppeteer = require('puppeteer');

/**
 * Inicializa um navegador Puppeteer.
 * @return {Object} Um objeto com: O navegador, a página atual e as páginas.
 */
async function initBrowser() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const pages = await browser.pages();

  return {
    browser,
    page,
    pages,
  };
};

module.exports = initBrowser;
