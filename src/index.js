const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const source_dir = core.getInput('source_dir', { required: true });

    const output_dir = core.getInput('output_dir') || './out';
    const config_file = core.getInput('config_file');
    const template_dir = core.getInput('template_dir');

    if (config_file) {
      try {
        await fs.promises.access(config_file);
      } catch (error) {
        core.setFailed('⛔️ Source directory does not exist');
        return;
      }
    }

    if (template_dir) {
      try {
        await fs.promises.access(template_dir);
      } catch (error) {
        core.setFailed('⛔️ Template directory does not exist');
        return;
      }
    }

    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;

    const templateName = path.basename(template_dir);

    const options = { recursive: true, force: false }
    
    let templatePath = path.join(GITHUB_WORKSPACE, template_dir)
    const templatesPath = path.join(__dirname, '../node_modules/jsdoc/templates')
    await io.mv(templatePath, templatesPath, options);


    let args = []
    args.push(source_dir);
    if (config_file) {
      args.push('-c', config_file);
    }
    if (template_dir) {
      templatePath = path.join(templatesPath, templateName);
      args.push('-t', templatePath);
    }
    args.push('-d', output_dir);

    const jsdocPath = path.join(__dirname, '../node_modules/jsdoc/jsdoc.js');


    core.info(`installing dependencies`);
    let lol = path.join(__dirname, '../')
    await exec.exec('npm i moment --production', [], {cwd: lol});

    core.info(`📝 Generating documentation`);
    await exec.exec(`node ${jsdocPath}`, args );

    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
