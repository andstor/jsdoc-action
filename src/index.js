const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    console.log(process.env.GITHUB_WORKSPACE)
    console.log(process.env)
    console.log(__dirname);

    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
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
    const jsdocPath = path.join(__dirname + '../node_modules/.bin/jsdoc');
    console.log(path.join(__dirname, 'node_modules/.bin/jsdoc'))
    console.log(path.resolve(__dirname, 'node_modules/.bin/jsdoc'))
    console.log(path.resolve(__dirname, 'lol/omg/node_modules/.bin/jsdoc'))
    console.log(jsdocPath)
    console.log('"' + jsdocPath + '"')
    const nodePath = await io.which('node', true)
    const npmPath = await io.which('npm', true)
    const jsdocPath = await io.which('jsdoc', true)
    console.log(nodePath);
    console.log(npmPath);
    console.log(jsdocPath);
    await exec.exec('"node_modules/.bin/jsdoc"', '' , {cwd: '/home/runner/work/_actions/andstor/jsdoc-action/test'} );

    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
