const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');
const installer = require('./installer');

async function run() {
  try {
    let templateName;

    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

    const source_dir = core.getInput('source_dir');
    const recurse = core.getInput('recurse');
    const output_dir = core.getInput('output_dir');
    const config_file = core.getInput('config_file');
    const input_template_name = core.getInput('template_name'); // Deprecated in favor of "template".
    const template = core.getInput('template') || input_template_name;
    const template_dir = core.getInput('template_dir');
    const front_page = core.getInput('front_page');

    if (input_template_name) {
      core.warning(`❗The "template_name" input variable is deprecated in favor of "template"`);
    }

    if (source_dir) {
      try {
        const srcPath = path.join(GITHUB_WORKSPACE, source_dir);
        await fs.promises.access(srcPath);
      } catch (error) {
        core.setFailed('⛔️ Source directory does not exist');
        return;
      }
    }

    if (config_file) {
      try {
        const configPath = path.join(GITHUB_WORKSPACE, config_file);
        await fs.promises.access(configPath);
      } catch (error) {
        core.setFailed('⛔️ Config file does not exist');
        return;
      }
    }

    if (template) {
      templateName = await installer.installTemplate(template);
    }

    const jsdocPath = path.join(__dirname, '../node_modules/jsdoc/jsdoc.js');

    let cmd = 'node';
    let args = [jsdocPath];

    if (source_dir) {
      const srcPath = path.join(GITHUB_WORKSPACE, source_dir);
      args.push(srcPath);
    }
    if (recurse) {
      args.push('-r');
    }
    if (config_file) {
      const configPath = path.join(GITHUB_WORKSPACE, config_file);
      args.push('-c', configPath);
    }
    if (template) {
      const templatePath = path.join(__dirname, '../node_modules/', templateName, template_dir);
      args.push('-t', templatePath);
    }
    if (front_page) {
      let readmePath = path.join(GITHUB_WORKSPACE, front_page);
      args.push('-R', readmePath);
    }
    if(output_dir) {
      args.push('-d', path.join(GITHUB_WORKSPACE, output_dir));
    }

    core.info(`📝 Generating documentation`);
    await exec.exec(cmd, args);
    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
