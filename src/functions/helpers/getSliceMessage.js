const getAttOfStudent = require('./getAttOfString');

/**
 * Cria uma mensagem para o usuário com suas respectivas notas.
 * @param {string} student - O nome do usuário.
 * @param {string} course - O curso do usuário.
 * @param {Array<Object>} grades - Um array contendo as notas das matérias.
 * @return {string} A mensagem concatenada com as notas do usuário.
 */
function messageUser(student, course, grades) {
  const {matricula, name} = getAttOfStudent(student);

  const headerMessageBody = '_Segue abaixo, *as notas encontradas* no numero ';
  const headerMessageBody2 = `de matricula ${matricula}. Notas das respectivas`;
  const headerMessageBody3 = ' matérias do componente curricular';
  const footerMessage = ` do CURSO ${course}_\n\n`;

  const headerMessage = `_Olá ${name}!_\n` + headerMessageBody +
  headerMessageBody2 + headerMessageBody3 + footerMessage;

  let messageBody = '';

  for (const grade of grades) {
    const nota = (grade.notas.Tri1MediaParcial !== '') ?
      grade.notas.Tri1MediaParcial : 'N/A';
    messageBody += `_${grade.name}: *${nota}*_\n`;
  }

  const fullMessage = headerMessage + messageBody;

  return fullMessage;
}

module.exports = messageUser;
