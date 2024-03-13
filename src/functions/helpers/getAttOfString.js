/**
 * Pega informações do aluno e retorna um objeto com as informações formatadas.
 * @param {string} text - O texto contendo número de matrícula e nome do aluno.
 * @return {Object} Objeto com o número de matrícula e o nome completo do aluno.
 */
function getAttOfStudent(text) {
  const [matricula, nomeCompleto] = text.split(' - ');

  const fullName = nomeCompleto.split(' ')
      .map((nome) => nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase())
      .join(' ');

  const name = fullName.split(' ')[0];

  return {
    matricula: matricula.trim(),
    fullName,
    name,
  };
}

module.exports = getAttOfStudent;
