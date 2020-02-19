const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    console.log(process.env.GITHUB_WORKSPACE)
    console.log(process.env)
    console.log(__dirname);
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

    let args = []
    args.push(source_dir);
    if (template_dir) {
      args.push('-c', config_file);
    }
    if (template_dir) {
      args.push('-t', template_dir);
    }
    args.push('-d', output_dir);

    core.info(`📝 Generating documentation`);
    const jsdocPath = __dirname + '../node_modules/.bin/jsdoc';
    console.log(path.join(__dirname + 'node_modules/.bin/jsdoc'))
    console.log(jsdocPath)
    console.log('"' + jsdocPath + '"')
    await exec.exec(jsdocPath, args);

    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
