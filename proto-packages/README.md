# Shortify Proto Packages

[![Build Status](https://upplify.visualstudio.com/Shortify/_apis/build/status/publish-artifacts?branchName=master)](https://upplify.visualstudio.com/Shortify/_build/latest?definitionId=18&branchName=master)

This packages delivery the [Proto Definitions Schemas](https://developers.google.com/protocol-buffers) to integrate and communicate with Shortify Services through [GRPC](https://grpc.io/).

-   Package Name
-   Package URL, based on NODE_ENV environment
-   Package Path to load schema

# Installation

---

This packages is feeded by [Azure Artifacts](https://azure.microsoft.com/pt-br/services/devops/artifacts/).

You just need to run the above command to install the package:

```bash
$ npm install shortify-proto-packages -S
```

**Note:** To be able to install this package you need to have a valid token and azure fetch pipeline registry url configured in your project or in your npm environment.

## How to Setup Azure Artificat Registry

---

You need to setup the authentication creedentials to the _AurezeDevops_ to be able to download the package. In the project root created a file named `.npmrc` who is responsible to communicate with azure and fetch artifacts information.

Use this [guide](https://docs.microsoft.com/en-us/azure/devops/artifacts/get-started-npm?view=azure-devops&tabs=windows#set-up-authentication-on-your-development-machine) to update the token in the `.npmrc` file.

> Note that you need to create a [personal authentication token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page). Set the lifetime of the token to **one year**. The people who work in the project can share the token.

# How To Use

---

Import the definitions for the service that you want to communicate:

```js
import { ShoritfyPackage } from 'shoritfy-proto-packages';

const { name, path, url } = ShortifyPackage;
```

### Development

See [Wiki Page](https://upplify.visualstudio.com/Shortify/_wiki/wikis/Shortify.wiki/102/Nomenclaturas) to learn how to contribute to the project.

### Todos

-   Change prod urls to real ones.

## License

All Rights Reserved to [Uppliyf.inc](http://upplify.com/).
