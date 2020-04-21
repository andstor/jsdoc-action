const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');
const utils = require('./utils');

/**
 * Installs a JSDoc template by executing `npm install template`.
 * The template needs to be a JavaScript package.
 * @param {string} template The JSDoc template to install.
 * @async
 * @returns {Promise<string>} The name of the installed template.
 */
async function installTemplate(template) {
    let templateName = '';
    const actionDir = path.join(__dirname, '../');

    let cmd = 'npm';
    let args = ['install', template, '--production', '--parseable'];
    core.info(`Installing JSDoc template: ${template}`);
    core.debug(`Command: ${cmd} ${args}`);

    let installOutput = '';
    const options = {};
    options.listeners = {
        stdout: (data) => {
            installOutput += data.toString();
        }
    };
    options.cwd = actionDir;

    await exec.exec(cmd, args, options);
    core.debug(`Installation output: ${installOutput}`);

    let parsedString = installOutput.trim().split(/\s+/);
    let packageLocation = parsedString[parsedString.length - 1]; // node_modules/folder
    const filePath = path.join(__dirname, packageLocation + '/package.json');
    templateName = await utils.getPackageName(filePath);

    return templateName;
}

module.exports = {
    installTemplate
};