const { helpTextDefault } = require('./helpText');
const { cliFormat } = require('./cliFormat');

const flags = {
  help: {
    type: 'boolean',
    alias: 'h',
    desc: 'Get the descriptions of the commands and flags',
  },
  clear: {
    type: `boolean`,
    default: true,
    alias: `c`,
    desc: `Clear the console`,
  },
  noClear: {
    type: `boolean`,
    default: false,
    desc: `Don't clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
  name: {
    type: `string`,
    alias: 'n',
    desc: 'Your Name that will be put on the License and in the author seciton of package.json',
  },
  userName: {
    type: 'string',
    alias: 'u',
    desc: 'Github Username that will be used to grab data to autofill fields.',
  },
  projName: {
    type: 'string',
    alias: 'p',
    desc: 'Name of the Project to auto input into the prompts and Files.',
  },
  license: {
    type: 'string',
    alias: 'l',
    desc: 'Tell the Prompts/Readme Which license you want to use.',
  },
  licenseGen: {
    type: 'boolean',
    default: true,
    alias: 'g',
    desc: 'Generate the license file for you.',
  },
  contributions: {
    type: 'boolean',
    default: true,
    alias: 'r',
    desc: 'Add a Contributions section with a link to the Contributor Covenant Code of Conduct.',
  },
  badges: {
    type: 'boolean',
    default: false,
    alias: 'b',
    desc: 'Add the default badges without prompting for them.',
  },
};

const commands = {
  gen: { desc: 'Generate README.md File for project' },
};

const helpText = helpTextDefault({
  name: ' rd-me ',
  flags,
  commands,
});

const options = {
  inferType: true,
  description: true,
  noFlagRejection: true,
  noCommandRejection: true,
  flags,
  commands,
};

module.exports = cliFormat(helpText, options);
