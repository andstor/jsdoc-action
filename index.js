const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    //console.log(process.env.GITHUB_WORKSPACE)
    //console.log(process.env)
    
    console.log(__dirname);
    console.log(process.env.GITHUB_WORKSPACE)
    process.env.GITHUB_WORKSPACE = __dirname;
    console.log(process.env.GITHUB_WORKSPACE)

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

    //const jsdocPath = path.join(__dirname + '../node_modules/.bin/jsdoc');
    //console.log(path.join(__dirname, 'node_modules/.bin/jsdoc'))
    //console.log(path.resolve(__dirname, 'node_modules/.bin/jsdoc'))
    //console.log(path.resolve(__dirname, 'lol/omg/node_modules/.bin/jsdoc'))
    const nodePath = await io.which('node', true)
    const npmPath2 = await io.which('npm', true)
    //const jsdocPath2= await io.which('jsdoc', true)
    core.info(`the path to node is ${nodePath}`);
    core.info(`the path to npm is ${npmPath2}`);
    core.info('OMG!');
    core.info('dirname', __dirname);
    //core.info(`the path to jsdoc is ${jsdocPath2}`);
    core.info(`📝 Generating documentation`);

    //core.addPath('node_modules/.bin/jsdoc');

    //await exec.exec('node node_modules/jsdoc/jsdoc.js', ['./src'] , {cwd: __dirname} );
    //await exec.exec('node node_modules/jsdoc/jsdoc.js', ['./src'] , {cwd: __dirname} );
    let jsdocPath = path.join(__dirname, 'node_modules/jsdoc/jsdoc.js');
    await exec.exec(`"${jsdocPath}"`, './src' );
    //await exec.exec('jsdoc', './src' , {cwd: __dirname} );
    //await exec.exec('jsdoc');

//    await exec.exec('node node_modules/jsdoc/jsdoc.js', ['./src'] , {cwd: __dirname} );

    core.info(`🎉 Documentation 📖 has ben generated to the ${output_dir} folder 📁`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
