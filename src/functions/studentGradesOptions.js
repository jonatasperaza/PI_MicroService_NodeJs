const sigaaMobileOptions = require('./sigaaMobileOptions');

/**
 * Inicializa um navegador Puppeteer.
 * @param {object} data - Objeto com credenciais do SIGAA
 * @return {Promise<Object>} Objeto informacoes do aluno e anchors.
 */
async function studentGradesOptions(data) {
  const {gradeOption, browser} = await sigaaMobileOptions(data);
  let anchorIndex = 11;
  let currentPage = null;
  const gradeOptions = [];
  const studentInfo = {};

  await new Promise((resolve) => setTimeout(resolve, 4000));
  await gradeOption.click();


  /**
 * Inicializa um navegador Puppeteer.
 * @param {object} page - Objeto com a pagina.
 * @return {Promise<Object>} Objeto informacoes do aluno e anchors.
 */
  async function handlePageElements(page) {
    const trElements = await page.$$('tr');
    const anchorElements = await page.$$('a');
    const studentName = await page.evaluate((element) => element
        .textContent, trElements[0]);
    const studentStatus = await page.evaluate((element) => element
        .textContent, trElements[1]);
    const studentCourse = await page.evaluate((element) => element
        .textContent, trElements[2]);

    studentInfo.name = studentName.replace('Discente:', '')
        .replace(/[\n\t]/g, '').trim();
    studentInfo.status = studentStatus.replace('Status:', '')
        .replace(/[\n\t]/g, '').trim();
    studentInfo.course = studentCourse.replace('Turma de entrada:', '')
        .replace(/[\n\t]/g, '').trim();

    const newTrs = trElements.slice(5);

    for (const tr of newTrs) {
      anchorIndex++;
      const textContent = await page.evaluate((element) => element
          .textContent, tr);

      const match = textContent
          .match(/(\d{4})\s*(APROVADO|REPROVADO|MATRICULADO)/);

      if (match) {
        const year = match[1];
        const status = match[2].replace(/[\n\t]/g, '').trim();

        gradeOptions.push({
          status,
          year,
          clickElement: anchorElements[anchorIndex],
        });
      }
    }
  }

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page();
      currentPage = newPage;
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await handlePageElements(newPage);
    }
  });

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return {
    gradeOptions,
    studentInfo,
    currentPage,
  };
}

module.exports = studentGradesOptions;
