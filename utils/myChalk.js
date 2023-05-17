// Resource - https://askubuntu.com/questions/558280/changing-colour-of-text-and-background-of-terminal

const myChalk = {
  default: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};39;${myChalk[bg]()}${text}\x1B[0m`,
  black: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};30;${myChalk[bg]()}${text}\x1B[0m`,
  darkRed: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};31;${myChalk[bg]()}${text}\x1B[0m`,
  darkGreen: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};32;${myChalk[bg]()}${text}\x1B[0m`,
  darkYellow: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};33;${myChalk[bg]()}${text}\x1B[0m`,
  darkBlue: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};34;${myChalk[bg]()}${text}\x1B[0m`,
  darkMagenta: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};35;${myChalk[bg]()}${text}\x1B[0m`,
  darkCyan: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};36;${myChalk[bg]()}${text}\x1B[0m`,
  lightGray: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};37;${myChalk[bg]()}${text}\x1B[0m`,
  darkGray: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};90;${myChalk[bg]()}${text}\x1B[0m`,
  red: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};91;${myChalk[bg]()}${text}\x1B[0m`,
  green: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};92;${myChalk[bg]()}${text}\x1B[0m`,
  orange: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};93;${myChalk[bg]()}${text}\x1B[0m`,
  blue: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};94;${myChalk[bg]()}${text}\x1B[0m`,
  magenta: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};95;${myChalk[bg]()}${text}\x1B[0m`,
  cyan: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};96;${myChalk[bg]()}${text}\x1B[0m`,
  white: (text, bg = 'bgDefault', style = 1) =>
    `\x1B[${style};97;${myChalk[bg]()}${text}\x1B[0m`,
  bgDefault: () => `49m`,
  bgBlack: () => `40m`,
  bgDarkRed: () => `41m`,
  bgDarkGreen: () => `42m`,
  bgDarkYellow: () => `43m`,
  bgDarkBlue: () => `44m`,
  bgDarkMagenta: () => `45m`,
  bgDarkCyan: () => `46m`,
  bgLightGray: () => `47m`,
  bgDarkGray: () => `100m`,
  bgRed: () => `101m`,
  bgGreen: () => `102m`,
  bgOrange: () => `103m`,
  bgBlue: () => `104m`,
  bgMagenta: () => `105m`,
  bgCyan: () => `106m`,
  bgWhite: () => `107m`,
};

module.exports = myChalk;
