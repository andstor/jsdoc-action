# jsdoc-action

> A GitHub Action to build JSDoc documentation

This is a GitHub Action to build your JavaScript documentation with [JSDoc](https://github.com/jsdoc/jsdoc). JSDoc [templates](https://github.com/jsdoc/jsdoc#templates) are supported. This action can easily be combied with other deployment actions, in order to publish the generated documentation to for example [GitHub Pages](https://pages.github.com).

The following example step will generate documentation for all source files in the `./src` directory and output the built files to the `./out` directory.

```yml
- name: Build
  uses: andstor/jsdoc-action@v1
  with:
    source_dir: ./src
    output_dir: ./out
```

## Supported platforms

The jsdoc-action is a JavaScript action and is supported on both **Linux**, **MacOS** and **Windows**.

## Templates 💅

You can use JSDoc templates with this action.  
Just set the `template_name` input variable to the name of the template you want to use. This needs to be name the template has package the 

## Options

The following environment variable options can/must be configured:

|Input variable|Necessity|Description|Default|
|----|----|----|----|
|`source_dir`|Required|Source directory to build documentation from.||
|`output_dir`|Optional|Output folder for the generated documentation.|`./out`|
|`recurse`|Optional|Recurse into subdirectories when scanning for source files|`true`|
|`config_file`|Optional|The path to a JSDoc configuration file.||
|`template_name`|Optional|The name of a JSDoc template package to install. Will run a `npm install template_name`||
|`template_dir`|Optional|The relative location of the template files directory within the template package.||
|`front_page`|Optional|The path to a Markdown file to be used as a the front page. Normally `README.md`||

## Examples

### GitHub Pages 🚀

An example for deploying JSDoc generated documentationto GitHub Pages with [actions-gh-pages](https://github.com/marketplace/actions/github-pages-action#table-of-contents).
This jsdoc-action workflow configuration uses the [minami](https://github.com/nijikokun/minami) JSDoc template and uses the `README.md` as frontpage.

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
      - uses: actions/checkout@v2

      - name: Build
        uses: andstor/jsdoc-action@v1
        with:
          source_dir: ./src
          output_dir: ./out
          config_file: conf.json
          template_name: minami
          front_page: README.md

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_dir: ./out
```

## License

Copyright © 2020 [André Storhaug](https://github.com/andstor)  
The jsdoc-action GitHub action is licensed under the Apache License, Version 2.0. See the [LICENSE](https://github.com/andstor/jsdoc-action/blob/master/LICENSE) file for more information.