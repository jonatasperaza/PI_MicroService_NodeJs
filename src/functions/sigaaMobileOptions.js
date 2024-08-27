const loginSigaa = require('./loginSigaa');

/**
 * Inicializa a pagina inicial do SIGAA Mobile.
 * @param {Object} data - Obejto contendo informacao do usuario
 * e o estado do navegador.
 * @return {Object} Um objeto com: O navegador
 *  e as opcoes do menu no modo Mobile.
 */
async function sigaaMobileOptions(data) {
  const {user, pass} = data;
  const {page, pages, browser} = await loginSigaa(user, pass);

  const sigaaOptions = await page.$$('.ui-link-inherit');
  const imgElement = await page.$('.fotoPerfil');
  const classOption = sigaaOptions[0];
  const gradeOption = sigaaOptions[1];
  const enrollmentOptions = sigaaOptions[2];
  const suplimentEnrollmentOptions = sigaaOptions[3];
  const academicTranscriptMobile = sigaaOptions[4];
  const exitSIGAA = sigaaOptions[5];

  const studentImage = await page.evaluate((element) =>
    element.getAttribute('src'), imgElement);

  const imageResponse = await fetch('https://sig.ifc.edu.br' + studentImage);
  const arrayBuffer = await imageResponse.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  const base64Image = imageBuffer.toString('base64');

  const previewStudentImage = `data:image/jpeg;base64,${base64Image}`;

  return {
    page,
    pages,
    browser,
    classOption,
    gradeOption,
    exitSIGAA,
    enrollmentOptions,
    academicTranscriptMobile,
    suplimentEnrollmentOptions,
    previewStudentImage,
  };
};

module.exports = sigaaMobileOptions;
