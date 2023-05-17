const myChalk = require('../myChalk');
const path = require('path');
const myPkg = require(path.join(__dirname, '..', '..', 'package.json'));

function helpTextDefault({ name, flags, commands }) {
  return `
${'\x1B[1m' + myChalk.darkGreen(` ${name} `, 'bgDefault', 7)} ${myChalk.default(
    `Author: ${myPkg.author}`,
    'bgDefault',
    2,
  )}

  ${'\x1B[1m' + myChalk.green(' USAGE ', 'bgDefault', 7)}

  ${`${myChalk.green(name, 'bgDefault', 2)} ${myChalk.cyan(
    '<command>',
  )} ${myChalk.darkYellow('[option]')}`}

  ${'\x1B[1m' + myChalk.cyan(' COMMANDS ', 'bgDefault', 7)}

  ${Object.keys(commands)
    .map((val, i, arr) => {
      return `${myChalk.cyan(val)}  ${myChalk.white(
        commands[val].desc,
        'bgDefault',
        0,
      )}`.trim();
    })
    .join('\n  ')}

  ${'\x1B[1m' + myChalk.darkYellow(' Flags ', 'bgDefault', 7)}

  ${Object.keys(flags)
    .map((val, i, arr) => {
      const option = `${myChalk.darkYellow(
        `${flags[val]?.alias ? `-${flags[val].alias},` : ''} --${val}`,
      )}`;
      return `${option}${' '.repeat(35 - option.length)}${myChalk.lightGray(
        flags[val].desc,
      )} ${
        flags[val]?.default?.toString()
          ? `${myChalk.darkGray('Default:')} ${myChalk.darkYellow(
              flags[val].default,
              'bgDefault',
              2,
            )}`
          : ''
      }`;
    })
    .join('\n  ')}
`;
}

module.exports = { helpTextDefault };
