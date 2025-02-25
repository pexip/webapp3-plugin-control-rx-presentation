# Web App 3 Plugin: Control receive presentation

Pexip Infinity has server-side capability to control whether or not a
participant will receive presentation.

This plugin adds the ability for a host participant to control this
funtionality.

## How to use

An additional menu item is added to the context menu (three dots) for each
participant in the paricipant list. This allows the host user to set:

- **Deny receive presentation**: Stop participant receiving presentation from the meeting
- **Allow receive presentation**: Allow participant to receive presentation from the meeting (default)

## Run for development

- To be able to build the plugin, you need to comply with the following versions
  or higher:

  | NodeJS   | NPM     |
  | -------- | ------- |
  | v20.12.2 | v10.5.0 |

- Install all the dependencies:

```bash
$ npm i
```

- Run the dev environment:

```bash
$ npm start
```

The plugin will be served from https://localhost:5173 (visit that page and
accept the self-signed certificates), but you should access it thought the Web
App 3 URL. You have more information about how to configure your environment in
the
[Developer Portal: Setup guide for plugin developers](https://developer.pexip.com/docs/plugins/webapp-3/setup-guide-for-plugin-developers).

## Build for production

To create a package, you will need to first install all the dependencies:

```bash
$ npm i
```

And now to create the package itself:

```bash
$ npm run build
```

Congrats! Your package is ready and it will be available in the `dist` folder.
The next step is to create a Web App3 branding and copy `dist` into that
branding.

If you want to know more about how to deploy your plugin in Pexip Infinity,
check our [Developer Portal](https://developer.pexip.com).
