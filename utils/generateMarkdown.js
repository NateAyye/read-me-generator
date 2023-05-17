// TODO: Create a function that returns a license badge based on which license is passed in

const path = require('path');
const { badgeChoices } = require('./data');
const fs = require('fs');

// If there is no license, return an empty string
function renderLicenseBadge(license, projectName, userName) {
  return !license
    ? ''
    : `![GitHub](https://img.shields.io/github/license/${userName}/${projectName}?label=License)`;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license, projectName, userName) {
  return !license
    ? ''
    : ` [${license} License](https://github.com/${userName}/${projectName}/blob/main/LICENSE)`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license, projectName, userName) {
  return !license
    ? ''
    : `## License
  Refer to the ${renderLicenseLink(
    license,
    projectName,
    userName,
  )} file within the root of the repository`;
}

function generateBadges(badges, projectName, userName) {
  return badges
    .map((badge) => badgeChoices[badge](projectName, userName))
    .join('\n');
}

async function renderUsageSection(imageDir) {
  try {
    const config = await fs.promises.readFile(
      path.join(process.cwd(), 'rdmerc.json'),
    );
    const parsedConfig = JSON.parse(config);

    return (
      await fs.promises.readdir(path.join(process.cwd(), imageDir), 'utf-8')
    )
      .filter((img) => img.startsWith('step'))
      .map((img, i, arr) => {
        return `${'1. '}${
          parsedConfig?.descriptions
            ? parsedConfig.descriptions[i]
            : path
                .parse(img)
                .name.split('-')
                .map((val) => val.slice(0, 1).toUpperCase() + val.slice(1))
                .join(' ')
        }\n![${img.replace(path.parse(img).ext, '')}](./${imageDir
          .split('\\')
          .join('/')}/${img})`;
      })
      .join('\n');
  } catch (err) {}
}

// TODO: Create a function to generate markdown for README
// Needs :
//  - formated Title
//  - unformated Title
//  - github UserName
//  - list of badges user wants
//  - license type
//  - description
//  - imagesDir
//  - if they want contributions
async function generateMarkdown(data) {
  const {
    formatedTitle,
    title,
    userName,
    badges,
    license,
    description,
    imagesDir,
    contributions,
  } = data;

  return `# ${formatedTitle}

${renderLicenseBadge(license, title, userName)}
${generateBadges(badges, title, userName)}

## Description 
${description}

## Installation

## Usage
${imagesDir === 'none' ? '' : await renderUsageSection(imagesDir)}

${renderLicenseSection(license, title, userName)}
${
  !contributions
    ? ''
    : `\n## Contributing
  Basic Rules for contributing to this repo are gonna be held to standards with the [Contributor Convenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) Standards.\n`
}`;
}

module.exports = generateMarkdown;
