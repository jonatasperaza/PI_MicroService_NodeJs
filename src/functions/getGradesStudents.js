const fs = require('fs');
const {getGradesType} = require('./helpers');
const studentGradesOptions = require('./studentGradesOptions');

/**
 * Converte uma imagem em Base64.
 * @param {string} imagePath - Caminho para a imagem.
 * @return {Promise<string>} - String Base64 da imagem.
 */
async function convertImageToBase64(imagePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, data) => {
      if (err) return reject(err);
      const base64Image = data.toString('base64');
      resolve(`data:image/png;base64,${base64Image}`);
    });
  });
}

/**
 * @param {number} index - Index para clicar no boletim correto.
 * @param {Object} data - Objeto com credenciais do SIGAA.
 * @return {Promise<Object>} Objeto informacoes do aluno e anchors.
 */
async function getGradesStudents(index, data) {
  const {gradeOptions, studentInfo, currentPage} = await studentGradesOptions(data);

  await new Promise((resolve) => setTimeout(resolve, 4000));
  await gradeOptions[index].clickElement.click();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await currentPage.setViewport({width: 1200, height: 800});
  await currentPage.screenshot({path: './src/assets/screenshot.png'});

  const gradesImageBase64 = await convertImageToBase64('./src/assets/screenshot.png');
  studentInfo.gradesImage = gradesImageBase64;

  const tdDisciplinas = await currentPage.$$('td.disciplina');
const tdNotas = await currentPage.$$('td.nota');

if (!tdDisciplinas || !tdNotas || tdDisciplinas.length === 0 || tdNotas.length === 0) {
  throw new Error('Disciplinas ou notas não foram encontradas na página.');
}

const grades = [];

for (let i = 0; i < tdDisciplinas.length; i++) {
  const disciplinaElement = tdDisciplinas[i];
  if (!disciplinaElement) continue;

  const disciplinaFullName = await currentPage.evaluate((element) =>
    element.textContent.trim(), disciplinaElement);

  const disciplina = disciplinaFullName.split(' - ')[1]?.trim() || 'Desconhecida';
  const materia = { fullName: disciplinaFullName, name: disciplina, notas: {} };

  for (let j = 0; j < 12; j++) {
    const tipoNota = getGradesType(j);
    const notasIndex = i * 12 + j;
    if (notasIndex >= tdNotas.length) continue;

    const notaElement = tdNotas[notasIndex];
    let nota = await currentPage.evaluate((element) =>
      element.textContent.trim(), notaElement);
    nota = nota.replace(/\n\t+/g, '');
    materia.notas[tipoNota] = nota;
  }

  grades.push(materia);
}


  return {studentInfo, grades};
}

module.exports = getGradesStudents;
