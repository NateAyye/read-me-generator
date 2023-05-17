const inquirer = require('inquirer');
const myChalk = require('./myChalk');
const {
  badgeChoices,
  licenseTypes,
  fuzzyExcludePaths,
  grabConfigData,
  grabPkgData,
  grabUserData,
} = require('./data');
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

function whenToPrompt(askIfNotThis) {
  if (!askIfNotThis) return true;
  return false;
}

async function validateUserName(input, answers) {
  if (input === '<github username>') return 'Must give Github userName';
  const userData = await grabUserData(input);
  answers['userData'] = { ...userData };
  return true;
}

function inquirerBadgeChoices() {
  return Object.keys(badgeChoices).map((val, i) => {
    return { name: val, checked: i < 2 ? false : true };
  });
}

function inquirerLicenseChoices() {
  const choices = Object.keys(licenseTypes).map((key) => {
    const newChoiceObj = {
      name: key,
      value: key,
      short: key,
    };
    return newChoiceObj;
  });
  return [{ name: 'No License', value: false, short: 'none' }, ...choices];
}

async function genPrompts(flags) {
  const pkgData = grabPkgData();
  const configData = grabConfigData();

  const userName =
    flags?.userName ??
    configData?.userName ??
    pkgData?.repository?.url
      ?.contains('github')
      ?.split('\\' || '/')
      ?.map((item, i, arr) => (item.contains('github') ? arr[i + 1] : null))
      ?.filter(Boolean)[0] ??
    null;

  const userData = userName ? await grabUserData(userName) : false;
  const projectName =
    configData?.projectName || pkgData?.name || flags?.projName;
  const description = configData?.description || pkgData?.description;
  const license = configData?.license || pkgData?.license || flags?.license;
  const licenseGen = configData?.licenseGen || flags?.licenseGen;
  const areContributions = configData?.contributions || flags?.contributions;
  const authorName = configData?.author || pkgData?.author || flags?.author;
  const badges = configData?.badges === true || flags?.badges;

  const prompts = [
    {
      type: 'input',
      name: 'userName',
      message: myChalk.green('What is your github username?'),
      default: '<github username>',
      validate: async (input, answers) =>
        await validateUserName(input, answers),
      filteringText: 'Checking if Username is valid...',
      when: whenToPrompt.bind(null, userName),
    },
    {
      type: 'input',
      name: 'projectName',
      message: myChalk.green('Name of the project:'),
      default: 'kabab-case',
      when: whenToPrompt.bind(null, projectName),
    },
    {
      type: 'input',
      name: 'description',
      message:
        myChalk.green('Description of the project:') +
        myChalk.darkGray(
          ' (Descriptive but consice explanation of the current project.) \n',
        ),
      when: whenToPrompt.bind(null, description),
    },
    {
      type: 'fuzzypath',
      name: 'imagesDir',
      excludePath: (nodePath) => {
        for (let i = 0; i < fuzzyExcludePaths.length; i++) {
          if (nodePath.startsWith(fuzzyExcludePaths[i])) return true;
        }
      },
      excludeFilter: (nodePath) => nodePath == '.',
      itemType: 'directory',
      rootPath: '.',
      message:
        myChalk.green(
          'Select a target directory containing your readme images:',
        ) +
        ' (See Documentation: https://github.com/NateAyye/readme-generator-cli#Usage)\n',
      default: 'none',
      depthLimit: 5,
      when: whenToPrompt.bind(null, configData?.imagesDir),
    },
    {
      type: 'checkbox',
      name: 'badges',
      message: myChalk.green(
        'Which Badges would you like to be included with you Readme?',
      ),
      choices: inquirerBadgeChoices(),
      when: whenToPrompt.bind(null, badges),
    },
    {
      type: 'list',
      name: 'license',
      message: myChalk.green('Which License are you using for this project?'),
      choices: inquirerLicenseChoices(),
      default: 0,
      when: whenToPrompt.bind(null, license),
    },
    {
      type: 'confirm',
      name: 'generateLicense',
      message:
        myChalk.green(
          '  - Do you want me to generate the LICENSE file for you?',
          'bgDefault',
          2,
        ) + myChalk.darkGray(' (Yes)', 'bgDefault', 2),
      default: true,
      when: whenToPrompt.bind(null, licenseGen),
    },
    {
      type: 'confirm',
      name: 'contributions',
      message:
        myChalk.green(
          'Add Contributions Section to README with link to Contributer Convenant Code of Conduct.',
        ) + myChalk.darkGray(' (Yes)', 'bgDefault', 2),
      default: true,
      when: whenToPrompt.bind(null, areContributions),
    },
  ];

  return {
    prompts,
    pkgData,
    authorName,
    badges,
    configData,
    projectName,
    description,
    userName,
    license,
    areContributions,
  };
}

module.exports = genPrompts;
