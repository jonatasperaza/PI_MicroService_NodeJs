const studentGradesOptions = require('./studentGradesOptions');
const {uploadTelegra, getGradesType} = require('./helpers');

/**
 * @param {number} index - Index para clicar no boletim correto.
 * @param {Object} data - Objeto com credenciais do SIGAA.
 * @return {Promise<Object>} Objeto informacoes do aluno e anchors.
 */
async function getGradesStudents(index, data) {
  const {gradeOptions,
    studentInfo,
    currentPage} = await studentGradesOptions(data);

  await new Promise((resolve) => setTimeout(resolve, 4000));
  await gradeOptions[index].clickElement.click();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await currentPage.setViewport({width: 1200, height: 800});
  await currentPage.screenshot({path: './src/assets/screenshot.png'});

  const gradesImageLink = await uploadTelegra('./src/assets/screenshot.png');
  studentInfo.gradesImage = gradesImageLink;

  const tdDisciplinas = await currentPage.$$('td.disciplina');
  const tdNotas = await currentPage.$$('td.nota');

  const grades = [];

  for (let i = 0; i < tdDisciplinas.length; i++) {
    const disciplinaFullName = await currentPage.evaluate((element) =>
      element.textContent.trim(), tdDisciplinas[i]);

    const disciplina = disciplinaFullName.split(' - ')[1].trim();
    const materia = {fullName: disciplinaFullName, name: disciplina, notas: {}};

    for (let j = 0; j < 12; j++) {
      const tipoNota = getGradesType(j);
      let nota = await currentPage.evaluate((element) =>
        element.textContent.trim(), tdNotas[i * 12 + j]);
      nota = nota.replace(/\n\t+/g, '');
      materia.notas[tipoNota] = nota;
    }

    grades.push(materia);
  }

  return {studentInfo, grades};
}

module.exports = getGradesStudents;
