
/**
 * @param {number} index - Index da nota ou situacao
 * @return {String} texto referente ao objeto.
 */
function getGradesType(index) {
  switch (index) {
    case 0:
      return 'Tri1';
    case 1:
      return 'Tri1Reava';
    case 2:
      return 'Tri1MediaParcial';
    case 3:
      return 'Tri2';
    case 4:
      return 'Tri2Reava';
    case 5:
      return 'Tri2MediaParcial';
    case 6:
      return 'Tri3';
    case 7:
      return 'Tri3Reava';
    case 8:
      return 'Tri3MediaParcial';
    case 9:
      return 'MediaFinal';
    case 10:
      return 'Faltas';
    case 11:
      return 'Situacao';
    default:
      return '';
  }
}

module.exports = getGradesType;
