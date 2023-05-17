const myChalk = require('../myChalk');
const sym = require('./logSymbols');

function alert(options) {
  const defaultOptions = {
    type: `error`,
    msg: `You forgot to define all options.`,
    name: ``,
  };
  const opts = { ...defaultOptions, ...options };
  const { type, msg, name } = opts;
  const printName = name ? name : type.toUpperCase();

  if (type === `success`) {
    console.log(
      `\n${sym.success} ${myChalk.green(
        ` ${printName} `,
        'bgDefault',
        7,
      )} ${myChalk.green(msg)}\n`,
    );
  }

  if (type === `warning`) {
    console.log(
      `\n${sym.warning} ${myChalk.orange(
        ` ${printName} `,
        'bgDefault',
        7,
      )} ${myChalk.orange(msg)}\n`,
    );
  }

  if (type === `info`) {
    console.log(
      `\n${sym.info} ${myChalk.blue(
        ` ${printName} `,
        'bgDefault',
        7,
      )} ${myChalk.blue(msg)}\n`,
    );
  }

  if (type === `error`) {
    console.log(
      `\n${sym.error} ${myChalk.red(
        ` ${printName} `,
        'bgDefault',
        7,
      )} ${myChalk.red(msg)}\n`,
    );
  }
}

module.exports = { alert };
