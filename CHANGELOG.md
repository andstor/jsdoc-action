# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]


## [1.2.1] - 2021-12-07
### Fixed
- Support template installation with Node.js 16 ([#40](https://github.com/andstor/jsdoc-action/issues/40)).

## [1.2.0] - 2020-04-21
### Changed
- Deprecates the `template_name` input variable in favor of `template`.

### Fixed
- Correct handling of templates installed from other sources than the npm package registry.

### Added
- Ability to install a specific version of a template.
- Automatic updating of major version tag on release (GitHub Action).

## [1.1.0] - 2020-02-26
### Added
- Checks for existence of files and directories specified in input variables.

### Changed
- Make the `source_dir` input variable optional.
- Don't set default value of the `recurse` input variable.
- Don't set default value of the `output_dir` input variable.

## [1.0.2] - 2020-02-24
### Fixed
- Specifying input files in JSDoc config files.

## [1.0.1] - 2020-02-22
### Fixed
- Fix GitHub Pages example in README.

## 1.0.0 - 2020-02-22

[Unreleased]: https://github.com/andstor/jsdoc-action/compare/v1.2.1...HEAD
[1.2.1]: https://github.com/andstor/jsdoc-action/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/andstor/jsdoc-action/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/andstor/jsdoc-action/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/andstor/jsdoc-action/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/andstor/jsdoc-action/compare/v1.0.0...v1.0.1
