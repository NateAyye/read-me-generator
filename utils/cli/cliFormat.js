const path = require('path');
const { alert } = require('../alerts');
const { clear } = require('console');

function cliFormat(helpText, options) {
  const flagsArr = Object.keys(options.flags);
  const throwFlagError = options.noFlagRejection;
  const throwCommandError = options.noCommandRejection;
  const flags = {};

  const input = process.argv
    .slice(2)
    .map((val, i, arr) => {
      if (val.includes('-') || arr[i ? i - 1 : i].includes('-')) {
        return;
      } else {
        return val;
      }
    })
    .filter(Boolean);

  const aliases = flagsArr
    .map((flag) => {
      const alias = options.flags[flag].alias;
      return alias;
    })
    .filter(Boolean);

  process.argv.slice(2).map((val, i, arr) => {
    if (val.includes('-')) {
      const flagName = val.includes('=')
        ? val.split('=')[0].replaceAll('-', '')
        : val.replaceAll('-', '');

      flags[
        aliases.includes(flagName)
          ? Object.keys(options.flags).filter(
              (val) =>
                options.flags[val] ===
                Object.values(options.flags).filter(
                  (val) => val.alias === flagName,
                )[0],
            )
          : flagName
      ] = val.includes('=')
        ? val.split('=')[1]
        : i === arr.length - 1
        ? true
        : arr[i + 1].includes('-')
        ? true
        : arr[i + 1];
    }
  });

  Object.keys(options.flags).forEach((flag) => {
    if (options.flags[flag]?.default) {
      flags[flag] = options.flags[flag].default;
    }
  });

  if (throwCommandError) {
    for (const command of input) {
      if (!Object.keys(options.commands).includes(command)) {
        alert({ type: 'error', msg: `command(s) ${command} is Unkown` });
        process.exit(1);
      }
    }
  }
  if (throwFlagError) {
    const unkownFlags = Object.keys(flags)
      .map((key) => {
        return Object.keys(options.flags).includes(key) ? '' : key;
      })
      .filter(Boolean);
    if (unkownFlags.length) {
      alert({
        type: 'error',
        msg: `flag(s) ${
          unkownFlags.length > 1 ? `(${unkownFlags})` : unkownFlags
        } is Unkown`,
      });
      process.exit(1);
    }
  }
  return {
    showHelp: () => {
      clear();
      console.log(helpText);
      process.exit(0);
    },
    showVersion: () => {
      console.log(`v${require(path.join(__dirname, 'package.json')).version}`);
    },
    input,
    flags,
  };
}

module.exports = { cliFormat };
