/**
 * Representa um erro de aviso.
 * @class
 * @extends Error
 */
class WarningError extends Error {
/**
* Cria uma instância de WarningError com uma mensagem de aviso especificada.
* @constructor
* @param {string} message - A mensagem de aviso associada a este erro de aviso.
*/
  constructor(message) {
    super(message);
    this.name = 'WarningError';
  }
}

module.exports = {
  WarningError,
};
