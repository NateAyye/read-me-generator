const { isUnicodeSupported } = require('./utils');
const myChalk = require('../myChalk');

const main = {
  info: myChalk.blue('ℹ'),
  success: myChalk.green('✔'),
  warning: myChalk.darkYellow('⚠'),
  error: myChalk.red('✖'),
};

const fallback = {
  info: myChalk.blue('i'),
  success: myChalk.green('√'),
  warning: myChalk.darkYellow('‼'),
  error: myChalk.red('×'),
};

const logSymbols = isUnicodeSupported() ? main : fallback;

module.exports = logSymbols;
