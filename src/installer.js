const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');

async function install(template_name) {

    const actionDir = path.join(__dirname, '../');
    let cmd = 'npm';
    let args = ['install', template_name, '--production'];

    core.info(`Installing JSDoc template: ${template_name}`);
    await exec.exec(cmd, args, { cwd: actionDir });
    core.debug(`Command: ${cmd} ${args}`);
}

module.exports.install = install;