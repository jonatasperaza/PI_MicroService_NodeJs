/**
 * Representa um erro indicando um parâmetro inválido.
 * @class
 * @extends Error
 */
class InvalidParameterError extends Error {
/**
* Cria uma instância de InvalidParameterError com a mensagem especificada.
* @constructor
* @param {string} message - A mensagem associada a este parâmetro inválido.
*/
  constructor(message) {
    super(message);
    this.name = 'InvalidParameterError';
  }
}

module.exports = {
  InvalidParameterError,
};
