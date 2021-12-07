# jsdoc-action

> A GitHub Action to build JSDoc documentation

This is a GitHub Action to build your JavaScript documentation with [JSDoc](https://github.com/jsdoc/jsdoc). This action can easily be combined with other deployment actions, in order to publish the generated documentation to for example [GitHub Pages](https://pages.github.com). JSDoc [templates](https://github.com/jsdoc/jsdoc#templates) are also supported.

The following example [workflow step](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) will generate documentation for all source files in the `./src` directory and output the built files to the `./out` directory.

```yml
- name: Build
  uses: andstor/jsdoc-action@v1
  with:
    source_dir: ./src
    recurse: true
    output_dir: ./out
```

## Supported platforms

The jsdoc-action is a JavaScript action and is supported on both Linux, MacOS and Windows. The action supports stable versions of Node.js 14 and later. 

| OS (runs-on) | ubuntu-latest | macos-latest | windows-latest |
|---|:---:|:---:|:---:|
| Support | ✅️ | ✅️ | ✅️ |

## Options ⚙️

The following input variables options can/must be configured:

|Input variable|Necessity|Description|Default|
|----|----|----|----|
|`source_dir`|Optional|Source directory to build documentation from.||
|`output_dir`|Optional|Output folder for the generated documentation.|`./out`|
|`recurse`|Optional|Recurse into subdirectories when scanning for source files.|`false`|
|`config_file`|Optional|The path to a JSDoc configuration file.||
|`template`|Optional|The JSDoc template package to install. Will run `npm install template`.||
|`template_dir`|Optional|The relative location of the template files directory within the template package.||
|`front_page`|Optional|The path to a Markdown file to be used as a the front page. Normally `README.md`.||

## Templates 💅

You can use JSDoc [templates](https://github.com/jsdoc/jsdoc#templates) with this action.  
Just set the `template` input variable to the name of the template you want to use. This needs to be template's package name.

If the template's template files is located somewhere else than the package's root, you need to specify this. Set the `template_dir` input variable to the location of the template folder (contains a `publish.js` file).

For example, to use the JSDoc [DocStrap](https://github.com/docstrap/docstrap) template, set the `template` input variable to `ink-docstrap` and the `template_dir` to the string `template`.

## JSDoc Configuration file 📄

To use a JSDoc [configuration file](https://jsdoc.app/about-configuring-jsdoc.html) located in your repository, you will need to specify the path to the file in the `config_file` input variable. Normally, if you use the [actions/checkout](https://github.com/actions/checkout), this will just resolve to `conf.json` or `conf.js`.

## Examples

### GitHub Pages 🚀

An example for deploying JSDoc generated documentation to GitHub Pages with [actions-gh-pages](https://github.com/marketplace/actions/github-pages-action#table-of-contents).

This jsdoc-action workflow configuration uses the [Minami](https://github.com/nijikokun/minami) JSDoc template and uses the root `README.md` file as the front page.

```yml
name: GitHub pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Build
        uses: andstor/jsdoc-action@v1
        with:
          source_dir: ./src
          output_dir: ./out
          config_file: conf.json
          template: minami
          front_page: README.md

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./out
```

## License

Copyright © 2020 [André Storhaug](https://github.com/andstor)

The jsdoc-action GitHub action is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
See the [LICENSE](https://github.com/andstor/jsdoc-action/blob/master/LICENSE) file for more information.
