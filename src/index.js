const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');
const installer = require('./installer');

async function run() {
  try {
    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

    const source_dir = core.getInput('source_dir', { required: true });
    const output_dir = core.getInput('output_dir') || './out';
    const config_file = core.getInput('config_file');
    const template_name = core.getInput('template_name');
    const template_dir = core.getInput('template_dir') || '';

    if (config_file) {
      try {
        await fs.promises.access(config_file);
      } catch (error) {
        core.setFailed('⛔️ Source directory does not exist');
        return;
      }
    }

    if (template_name) {
      installer.install(template_name);
    }

    const jsdocPath = path.join(__dirname, '../node_modules/jsdoc/jsdoc.js');
    const srcPath = path.join(GITHUB_WORKSPACE, source_dir);

    let cmd = 'node';
    let args = [jsdocPath, srcPath];

    if (config_file) {
      args.push('-c', config_file);
    }
    if (template_name) {
      const templatePath = path.join('./node_modules/', template_name, template_dir);
      args.push('-t', path.join(__dirname, '../node_modules/ink-docstrap/template'));
    }
    args.push('-d', path.join(GITHUB_WORKSPACE, output_dir));

    const actionPath = path.join(__dirname, '../');
    core.info(`📝 Generating documentation`);
    await exec.exec(cmd, args, { cwd: actionPath });
    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
