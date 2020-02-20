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


    const options = { recursive: true, force: false }
    
    const templatePath = path.join(GITHUB_WORKSPACE, template_dir)
    const templateDest = path.join(__dirname, '../node_modules/jsdoc/templates')
    core.info(templatePath)
    core.info(templateDest)
    await io.mv(templatePath, templateDest, options);


    let args = []
    args.push(source_dir);
    if (config_file) {
      args.push('-c', config_file);
    }
    if (template_dir) {
      args.push('-t', templateDest);
    }
    args.push('-d', output_dir);

    const jsdocPath = path.join(__dirname, '../node_modules/jsdoc/jsdoc.js');

    core.info(`📝 Generating documentation`);
    await exec.exec(`node ${jsdocPath}`, args );

    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
