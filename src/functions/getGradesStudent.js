const studentGradesOptions = require('./studentGradesOptions');

/**
 * Inicializa um navegador Puppeteer.
 * @param {number} index - Index para clicar no boletim correto.
 * @return {Promise<Object>} Objeto informacoes do aluno e anchors.
 */
async function acessStudentGrades(index, {user, pass}) {
  const {gradeOptions,
    studentInfo,
    currentPage} = await studentGradesOptions(user, pass);
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await gradeOptions[index].clickElement.click();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await currentPage.setViewport({width: 1200, height: 800});
  await currentPage.screenshot({path: './src/assets/screenshot.png'});

  return {...studentInfo, ...currentPage};
}

module.exports = acessStudentGrades;
