const { alert } = require('./alerts');
const path = require('path');
const { octokit } = require('./api');

const licenseTypes = {
  MIT: 'mit',
  'Apache-2.0': 'apache-2.0',
  'AGPL-3.0': 'agpl-3.0',
  'BSD-2-Clause': 'bsd-2-clause',
  'BSD-3-Clause': 'bsd-3-clause',
  'BSL-1.0': 'bsl-1.0',
  'CC0-1.0': 'cc0-1.0',
  'EPL-2.0': 'epl-2.0',
  'GPL-2.0': 'gpl-2.0',
  'GPL-3.0': 'gpl-3.0',
  'LGPL-2.1': 'lgpl-2.1',
  'MPL-2.0': 'mpl-2.0',
  Unlicense: 'unlicense',
};

const badgeChoices = {
  'NPM Package Version': (projectName, userName) =>
    `![npm](https://img.shields.io/npm/v/${projectName})`,
  'Github Workflow Status': (projectName, userName) =>
    `[![build](https://github.com/${userName}/${projectName}/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/${userName}/${projectName}/actions/workflows/pages/pages-build-deployment)`,
  Languages: (projectName, userName) =>
    `![GitHub language count](https://img.shields.io/github/languages/count/${userName}/${projectName})`,
  'Top Language': (projectName, userName) =>
    `![GitHub top language](https://img.shields.io/github/languages/top/${userName}/${projectName})`,
  'Github Forks': (projectName, userName) =>
    `![GitHub forks](https://img.shields.io/github/forks/${userName}/${projectName}?style=social)`,
  'Github Last Commit': (projectName, userName) =>
    `![GitHub last commit](https://img.shields.io/github/last-commit/${userName}/${projectName})`,
};

const fuzzyExcludePaths = [
  'node_modules',
  '.git',
  'package.json',
  'package-lock.json',
  'README',
  '.env',
];

async function grabUserData(userName) {
  try {
    const userData = await octokit.request('GET /users/{username}', {
      username: userName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return userData.data;
  } catch (err) {
    alert({
      type: 'error',
      msg: `${err.message}: Could not find User with that Username...`,
    });
  }
}

function grabPkgData() {
  try {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    return pkg;
  } catch (err) {
    return {};
  }
}

function grabConfigData() {
  try {
    const config = require(path.join(process.cwd(), 'rdmerc.json'));
    return config;
  } catch (err) {}
}

module.exports = {
  badgeChoices,
  licenseTypes,
  fuzzyExcludePaths,
  grabConfigData,
  grabPkgData,
  grabUserData,
};
