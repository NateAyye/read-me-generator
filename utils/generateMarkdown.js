const path = require('path');
const { badgeChoices } = require('./data');
const fs = require('fs');

// If there is no license, return an empty string
const renderLicenseBadge = (license, projectName, userName) =>
  !license
    ? ''
    : `![GitHub](https://img.shields.io/github/license/${userName}/${projectName})`;

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = (license, projectName, userName) =>
  !license
    ? ''
    : ` [${license} License](https://github.com/${userName}/${projectName}/blob/main/LICENSE)`;

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = (license, projectName, userName) =>
  !license
    ? ''
    : `## License
Refer to the ` +
      `${renderLicenseLink(license, projectName, userName)}` +
      ` file within the root of the repository`;

const generateBadges = (badges, projectName, userName) =>
  badges.map((badge) => badgeChoices[badge](projectName, userName)).join('\n');

async function renderUsageSection(imageDir, configData) {
  return (
    await fs.promises.readdir(path.join(process.cwd(), imageDir), 'utf-8')
  )
    .filter((img) => img.startsWith('step'))
    .map((img, i, arr) => {
      const imgName = path
        .parse(img)
        .name?.split('-')
        ?.map((val) => val.slice(0, 1).toUpperCase() + val.slice(1))
        ?.join(' ');

      return `${
        configData?.descriptions ? configData.descriptions[i] : imgName
      }\n\n![${img.replace(path.parse(img).ext, '')}](./${imageDir
        .split('\\')
        .join('/')}/${img})\n`;
    })
    .join('\n');
}

async function generateMarkdown({
  formatedTitle,
  title,
  userName,
  badges,
  license,
  description,
  imagesDir,
  configData,
  contributions,
}) {
  return `# ${formatedTitle}

${renderLicenseBadge(license, title, userName)}
${generateBadges(badges, title, userName)}

## Description 
${description}

## Installation

## Usage
${imagesDir === 'none' ? '' : await renderUsageSection(imagesDir, configData)}

${renderLicenseSection(license, title, userName)}
${
  !contributions
    ? ''
    : `\n## Contributing
  Basic Rules for contributing to this repo are gonna be held to standards with the [Contributor Convenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) Standards.\n`
}`;
}

module.exports = generateMarkdown;
