const axios = require('axios');
const BodyForm = require('form-data');
const fs = require('fs');

/**
 * Inicializa um navegador Puppeteer.
 * @param {string} Path - Path com a imagem
 * @return {Promise<string>} String com a imagem no telegra.
 */
function uploadTelegra(Path) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(Path)) {
      return reject(new Error('Arquivo não encontrado'));
    };
    try {
      const form = new BodyForm();
      form.append('file', fs.createReadStream(Path));
      const data = await axios({
        url: 'https://telegra.ph/upload',
        method: 'POST',
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve('https://telegra.ph' + data.data[0].src);
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}

module.exports = uploadTelegra;
