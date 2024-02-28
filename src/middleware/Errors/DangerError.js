/**
 * Representa um erro indicando uma condição perigosa.
 * @extends Error
 */
class DangerError extends Error {
/**
* Cria uma instância de DangerError.
* @param {string} message - A mensagem de erro.
*/
  constructor(message) {
    super(message);
    /**
    * O nome do erro.
    * @type {string}
    */
    this.name = 'DangerError';
  }
}

module.exports = {
  DangerError,
};
