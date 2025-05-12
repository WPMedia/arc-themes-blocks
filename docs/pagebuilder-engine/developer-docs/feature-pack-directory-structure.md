---
title: Feature Pack Directory Structure
description: Feature Pack Directory Structure
lastUpdated: 2023-12-19T01:06:39.000Z
migrationData:
  short_description: Feature Pack Directory Structure
  number: KB0010070
  sys_id: 647a2bbfc30f35101fe095ff0501319f
  sys_created_on: '2023-12-18 20:06:25'
  sys_updated_on: '2023-12-18 20:06:39'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    Pagebuilder Engine, Directory Structure, Directory, environment folder,
    .env, 
  topic: General
  sys_view_count: 1410
  helpful_count: 2
  version: 088aabbfc30f35101fe095ff050131b3
  display_number: KB0010070 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.469Z
---

Now that we’ve created a Feature Pack skeleton, let’s look inside to see what was created.

## Guidelines

While you don't want to remove or rename any files or directories in the Feature Pack that are listed here (PageBuilder Engine expects them to be there), it's okay to add more files or directories as needed (for example, maybe a `/utils/` directory for utility functions).

## Directory structure

The guide below will walk you through the structure of each directory and (most) files in the generated Feature Pack skeleton, and their purpose.

* `/components/`: This is where the actual React components that make up your Feature Pack’s structure will exist. They are subdivided by component type.
  * `chains/`: Code for [Chain](/pagebuilder-engine/developer-docs/chain-api/) components.
  * `features/`: Code for [Feature](/pagebuilder-engine/developer-docs/feature-api/) components.
  * `layouts/`: Code for [Layout](/pagebuilder-engine/developer-docs/layout-api/) components.
  * `output-types/`: Code for [Output-Type](/pagebuilder-engine/developer-docs/output-type-api/) components.
* `/content/`: This directory is for defining the sources and shape of data that Feature Pack components will consume data from.
  * `sources/`: This directory holds code used to define content sources used by your Feature Pack.
* `/data/`: This directory is for any database related artifacts.
  * `dumps/`: Directory where database dumps can be exported.
  * `restore/`: Allows you to [Manually Restore Your Database From A Tarball](/pagebuilder-engine/developer-docs/how-to-run-pagebuilder-engine-locally-starting-with-my-organizations-live-bundle-and-pages/#download-pb-data-from-the-arc-xp-admin).
* `/environment/`: Directory for defining environment values available on the _server only_. These values can be encrypted at rest and used for secret values like credentials.
* `/node_modules/`: This is the directory where your local Node modules are installed, just like every other Node app you’ve ever developed. You shouldn’t have to edit this directory manually, and it is included in the `.gitignore` file.
* `/properties/`: This directory is meant for _non-secret_ “site” properties whose values can differ on a per-site basis. They are available in components.
  * `sites/`: This directory holds the site-specific overrides of the default site properties.
  * `index.js or index.json`: This file holds the default site properties. It can either export a JavaScript object or be a simple JSON file.
* `/resources/`: This directory is for static resources like images, CSS, fonts and more that don’t need processing.
* `/.dockerignore`: [Reference](https://docs.docker.com/engine/reference/builder/#dockerignore-file). Consider this read-only.
* `/.env`: This file is git-ignored and development environment specific. You’ll [Specify Environment Variables](/pagebuilder-engine/developer-docs/environment-variables/) here used by Docker and PageBuilder Engine.
* `/.gitignore`: [Reference](https://git-scm.com/docs/gitignore)
* `/package-lock.json`: A lockfile derived from installing the dependencies in `package.json`. [Reference](https://docs.npmjs.com/files/package-lock.json). Consider this read-only.
* `/package.json`: Manifest file where you can declare `dependencies` or `devDependencies` you wish to use in your application, as well as for handy `scripts`. [Reference](https://docs.npmjs.com/files/package.json).
