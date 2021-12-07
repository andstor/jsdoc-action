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
    core.debug(`actionDir: ${actionDir}`);

    let cmd = 'npm';
    let args = ['install', template, '--production'];
    core.info(`Installing JSDoc template: ${template}`);
    core.debug(`Command: ${cmd} ${args}`);


    const options = {};
    options.cwd = actionDir;
    await exec.exec(cmd, args, options);
    
    let lsOutput = '';
    let lsError = '';
    options.listeners = {
        stdout: (data) => {
            lsOutput += data.toString();
        },
        stderr: (data) => {
            lsError += data.toString();
        }
    };
    
    await exec.exec('npm', ['ls', template, '-p'], options);
    core.debug(`Template location: ${lsOutput}`);
    if (lsError) core.info(`Error: ${lsError}`);
    let packageLocation = lsOutput.trim(); // path/to/template
    
    const filePath = path.join(packageLocation + '/package.json');
    templateName = await utils.getPackageName(filePath);

    return templateName;
}

module.exports = {
    installTemplate
};
