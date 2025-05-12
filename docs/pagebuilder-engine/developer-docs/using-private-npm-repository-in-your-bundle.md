---
title: Using Private NPM Repository in your bundle
description: Using Private NPM Repository in your bundle
lastUpdated: 2023-07-14T23:05:45.000Z
migrationData:
  short_description: Using Private NPM Repository in your bundle
  number: KB0010239
  sys_id: b7aab611470cb190eee38788436d4376
  sys_created_on: '2023-07-14 19:04:34'
  sys_updated_on: '2023-07-14 19:05:45'
  sys_created_by: ben.swedberg@washpost.com
  sys_updated_by: ben.swedberg@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: PageBuilder Engine, NPM Repository, .npmrc, encrypted
  topic: General
  sys_view_count: 656
  helpful_count: 0
  version: 4dfa7651470cb190eee38788436d438e
  display_number: KB0010239 v4.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.428Z
---

You can use private NPM repositories from any registries of your choice, whether it be the default NPM registry or through Artifactory. We suggest having your private registry tokens encrypted in your bundle. Like how we handled the [Environmental Secrets](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-use-environment-variables-and--secrets-.html), all you have to do is configure your `.npmrc` file appropriately and encrypt the keys using the Maestro "Secrets" Page.

First, create the `.npmrc` file as you normally would with unencrypted auth tokens, as well as a separate `.npmrc-encrypted` file, which will contain your encrypted NPM auth tokens. We will be using `.npmrc` file for local development, and `.npmrc-encrypted` for deployments on Arc XP environments. Make sure to include `.npmrc` file in your `.gitignore` so that your secrets are not committed to the repo. At deployment time, fusion will decrypt `.npmrc-encrypted` for installing your private modules.

:::note
Because the encryption key is on per-client, per-region basis, as long as your environments all operate within the same region, you will be able to keep one encryption for all of the environments.
:::

Here is an example `.npmrc-encrypted` config file with the encrypted variables:

```
; This is the default registry from which NPM will pull from for all other repositories
registry=http://registry.npmjs.org/
; This line provides the npm registry the authentication credential that you want to pass to it, which
; will usually be your own account's auth token
//registry.npmjs.org/:_authToken=%{AQECAHhPwAyPK3nfERyAvmyWOWx9c41uht+ei4Zlv4NgrlmypwAAAMYwgcMGCSqGSIb3DQEHBqCBtTCBsgIBADCBrAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxwBJdfzqcQUpox1xsCARCAf2aXwBJ3pBUP12HWB3cdBboV1/qN0HFEsjNycADYIq7XSANeDYOlu2/Dwt/52R16hK4dbVOt0ofNKKx0b3vtZRaH9bX1Dkx6TDhmo5g32H0aWpiUW6PQIp72/g2CW1nr26T0zxmkxmX9u8ufoQGBXRd1pOfT2EliUhMKabNeSyk=}

; For this particular scope, NPM will try to pull from the `this-is-another-registry.org`.
@test-registry:registry=http://this-is-another-registry.org/
; This line will provide the authentication needed to pull from `this-is-another-registry.org`
//this-is-another-registry.org/:_authToken=%{AQECAHhPwAyPK3nfERyAvmyWOWx9c41uht+ei4Zlv4NgrlmypwAAAMYwgcMGCSqGSIb3DQEHBqCBtTCBsgIBADCBrAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxwBJdfzqcQUpox1xsCARCAf2aXwBJ3pBUP12HWB3cdBboV1/qN0HFEsjNycADYIq7XSANeDYOlu2/Dwt/52R16hK4dbVOt0ofNKKx0b3vtZRaH9bX1Dkx6TDhmo5g32H0aWpiUW6PQIp72/g2CW1nr26T0zxmkxmX9u8ufoQGBXRd1pOfT2EliUhMKabNeSyk=}
```

This is all you need to install your private repos!

:::note
If the encrypted key is wrong, it will fail the rest of the build process, potentially causing incomplete build to be deployed. Make sure to double check the keys!
:::

As you might have noticed, we are only able to pass one authentication token at a time for each registry. Therefore, the authentication you provide should be that of an account that has access to all the private repositories you need for that registry. Because of the inherent limitations of how NPM handles its configuration, you will not be able to pass it multiple auth tokens per registry, i.e. put in auth token for one private repo in one line and another auth token for another repo in another within the same registry.

Once you have set up your `.npmrc` file accordingly, all you have to do is deploy your bundle and PageBuilder Engine will take care of the rest!

:::note
Up until Engine 3.0 version, themes and OBF bundles used to require `.npmrc-encrypted` to be able to install Arc Blocks. After 3.0 this is deprecated and Engine start to handle this automatically at build time. If you are deploying a bundle with Engine 3.0 and newer version and don't have your own private npm registry, you can safely remove `.npmrc` and `.npmrc-encrypted` from your bundle.
:::

## CI/CD platform integration

If you're using a continuous integration continuous deployment (CI/CD) platform in your development process, that platform also needs access to your private repository. Under no circumstance should you include `.npmrc` in your repository to solve this. Including `.npmrc` exposes all tokens in the platform, which creates a great risk to your organization.

Instead, you should use your CI/CD platform's offer to add secrets and encrypted variables to your project on their platform. Typically, a step in the build process is to install all NPM dependencies. Right before that step, the platform dynamically creates a temporary `.npmrc` file with the token stored on your CI/CD platform.

As an example, the following code snippet shows how the step would look in a CircleCI configuration, with `NPM_TOKEN` being the environment variable stored in CircleCI:

```
      - run:
          name: Install dependencies
          command: |
            echo "@wpmedia:registry=https://npm.pkg.github.com/" > .npmrc
            echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
            npm install --no-save
```

This way, all tokens are securely hidden and encrypted and are not exposed in the repository.

:::note
If a token has been exposed previously, you should create a new token and add only the new encrypted token to the repository or your CI/CD platform. Encrypting an already exposed token does not remove the risk.
:::
