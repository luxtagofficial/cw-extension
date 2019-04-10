# nem2-wallet-browserextension

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build Status](https://travis-ci.org/aleixmorgadas/nem2-wallet-browserextension.svg?branch=master)](https://travis-ci.org/aleixmorgadas/nem2-wallet-browserextension)

[NEM2][nem2], aka Catapult, Wallet as Firefox Extension.

## Vision

A browser wallet to facilitate the integration with web applications and Catapult Blockchain in a user-friendly manner.

## Contributing

- [Alpha Milestone Scope](https://github.com/aleixmorgadas/nem2-wallet-browserextension/wiki/Alpha-Milestone)
- [Non Planned Features](https://github.com/aleixmorgadas/nem2-wallet-browserextension/wiki/Non-Planned-Features)
- [Development Guidelines](https://github.com/aleixmorgadas/nem2-wallet-browserextension/wiki/Development-Guidelines)
- [Development Environment](https://github.com/aleixmorgadas/nem2-wallet-browserextension/wiki/Development-environment)

When you find that _nem2-wallet-browserextension_ could have XYZ, __think about what you can do for open source not what open source can do for you__. If you find something it's not working or something is missing, feel free to open a Pull Request, I will be more than happy to merge it, but I don't do features on demand :smile:.

## Tools (I use)

- npm or yarn
- [visual studio code](https://code.visualstudio.com/) or your prefered IDE
- [web-ext](https://github.com/mozilla/web-ext)

```bash
$> npm install --global web-ext
```

- [Firefox](https://www.mozilla.org/en-US/firefox/new/)

## Clone repository

```bash
$> git clone git@github.com:aleixmorgadas/nem2-wallet-browserextension.git
$> cd nem2-wallet-browserextension
```

## Install development dependencies

```
$> npm i
```

## Run development mode

In a windows environment:
```
$> npm run windev
```

In other environments:

```
$> npm run watch & npm run web-ext:run
```

`web-ext` will open your Firefox browser with the extension loaded.

## License

Copyright (c) 2018-2019 NEM Licensed under the Apache License 2.0

[nem2]: https://nemtech.github.io/