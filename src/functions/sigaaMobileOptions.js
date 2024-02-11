const loginSigaa = require('./loginSigaa');

async function sigaaMobileOptions(data) {
  const {user, pass} = data;
  const page = await loginSigaa(user, pass);

  const sigaaOptions = await page.$$(".ui-link-inherit");
  const classOption = sigaaOptions[0];
  const gradeOption = sigaaOptions[1];
  const enrollmentOptions = sigaaOptions[2];
  const suplimentEnrollmentOptions = sigaaOptions[3];
  const academicTranscriptMobile = sigaaOptions[4];
  const exitSIGAA = sigaaOptions[5];

  return {
    page,
    classOption,
    gradeOption,
    exitSIGAA,
    enrollmentOptions,
    academicTranscriptMobile,
    suplimentEnrollmentOptions
  }
};

module.exports = sigaaMobileOptions;
