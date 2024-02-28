const {loadCommomFunctions} = require('./Commom/loadCommomFunctions');
const {connect} = require('./connection/connection');
const {load} = require('./connection/loader');

module.exports = {
  load,
  connect,
  loadCommomFunctions,
};
