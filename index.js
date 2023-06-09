// TODO: Include packages needed for this application
const { prompt } = require('inquirer');
const genPrompts = require('./utils/prompts');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const buildLicenseFile = require('./utils/buildLicenseFile');
const cli = require('./utils/cli');
const { alert } = require('./utils/alerts');
const { clear } = require('console');
const { defaultBadges } = require('./utils/data');
const { showHelp, showVersion, input, flags } = cli;

// TODO: Create a function to write README file
async function writeToFile(fileName, data) {
  try {
    await fs.promises.writeFile(`./${fileName}`, await generateMarkdown(data));
  } catch (err) {
    alert({
      type: 'error',
      msg: `${err.message}: Could not Create ${fileName} file`,
    });
  }
}

// TODO: Create a function to initialize app
async function init() {
  flags.clear && clear();

  flags.help && showHelp();

  if (input.includes('gen')) {
    const {
      prompts,
      pkgData,
      authorName,
      configData,
      badges,
      projectName,
      description,
      userName,
      license,
      areContributions,
    } = await genPrompts(flags);

    prompt(prompts).then(async (answers) => {
      const title = (answers?.projectName || projectName)
        .split('-')
        .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(' ');

      if (answers?.generateLicense || flags?.licenseGen) {
        try {
          await fs.promises.writeFile(
            './LICENSE',
            await buildLicenseFile(
              answers?.license || license,
              authorName,
              answers?.projectName || projectName,
            ),
          );
        } catch (err) {
          alert({
            type: 'error',
            msg: `${err.message}: Could not Create License file`,
          });
        }
      }
      await writeToFile('README.md', {
        formatedTitle: title,
        title: answers?.projectName || projectName,
        userName: answers?.userName || userName,
        badges: answers?.badges || badges ? Object.keys(defaultBadges) : [],
        license,
        description,
        configData,
        imagesDir: configData?.imagesDir || answers?.imagesDir,
        contributions: areContributions,
      });
    });
  }

  flags.version && showVersion();
}

// Function call to initialize app
init();
