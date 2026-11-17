# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.1] - 2026-11-16

### Changed

- Updated `@pexip/plugin-api` to 22.4.1.
- Updated dev dependencies: `typescript` to 7.0.2, `vite` to 8.3.8 and
  `vite-plugin-mkcert` to 2.1.0.
- Changed `moduleResolution` to `bundler` in `tsconfig.json`, as required by
  TypeScript 7.

### Removed

- Unused dev dependencies `eslint`, `eslint-config-love`,
  `eslint-config-prettier` and `prettier`, along with the `lint` script.

## [1.0.0]

### Added

- Participant action to control the receive presentation, shown only in
  transcoded calls.
- Toast notification when the action is triggered.
- CI workflow to build the plugin.
