---
title: >-
  How to use PageBuilder Deployer's deployment preview functionality for testing
  bundle code changes
description: >-
  How to use PageBuilder Deployer's deployment preview functionality for testing
  bundle code changes
lastUpdated: 2023-11-23T02:53:32.000Z
migrationData:
  short_description: >-
    How to use PageBuilder Deployer's deployment preview functionality for
    testing bundle code changes
  number: KB0011244
  sys_id: 15878e2bc32ef1101fe095ff05013167
  sys_created_on: '2023-11-22 21:44:20'
  sys_updated_on: '2023-11-22 21:53:32'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 63
  helpful_count: 0
  version: 08a90eebc32ef1101fe095ff0501317c
  display_number: KB0011244 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.224Z
---

When your developer team introduces changes to bundle code, these changes have direct impact on previously configured pages, templates, and resolvers.

Changes can be bug fixes on server-side render, front-end CSS, new capabilities, or architectural changes, like introducing new custom fields to your content sources, adding new output types, or deprecating them.

Most of our clients utilize unit or other programmatical testing methods to automate regressions when making these type of code changes. Unless you are running end-to-end tests (frameworks like Cypress, Playwright, Selenium) with utilizing PB-Data exports from your production environment to simulate production environment, programmatic tests do not cover real life cases with production data.

The PageBuilder Deployer tool already has blue/green deployments where your developers can deploy a bundle code, and make it on standby and be able to swap these slots with “live” version. This process is a best practice in a software delivery ecosystem that allows quick rollbacks when needed.

A capability tied to Deployer’s blue/green architecture is called “Deployment Previews” and can be used for testing code changes in Production (or other environments) before switching these deployments live.

## Deployer's Deployment Previews

The way PageBuilder Deployer keeps these ready-to-go-live bundles (we call them “on-deck bundles”) is actually as fully deployed AWS environments with version of your bundle. Each on-deck deployment slot in a way, a copy of live environment with different bundle code.

The Deployer tool provides a “Preview” function for each on-deck deployment that opens a special preview window that runs same pages and URLs of your site with that particular deployment.

To access this, open PageBuilder, navigate to Deployer (under the Developer Tools menu), click more (… icon) in the deployment you want to preview, then click “Preview” option from the menu:

![Deployer's Deployment Previews](/images/pagebuilder-engine/deployers_deployment_previews.png)

This option opens a Preview mode with a toolbar at the top showing which deployment is being previewed and a site selector. You can change the site to preview your deployment with a specific site.

You can also navigate within this preview mode that will preserve the preview links so you can test a feature used in a deeper page.

![Preview Mode](/images/pagebuilder-engine/preview_mode.png)

Keep in mind that both your content and page configuration from PageBuilder Editor will be using “live” and published configurations using code changes your team deployed. This is particularly useful to perform regression for a deployment before it goes live.

## Manually adding `?d` parameter to access preview URLs

The Deployer Preview page effectively opens your website (from [arcpublishing.com](http://arcpublishing.com/) domain, not CDN) in an iframe with a few parameters added to the URL in order to render your page with the specific non-live deployment. Currently this parameter is `d` parameter in the URL query string. The value of this parameter corresponds to the deployment id that is being displayed in deployer UI.

The way origin servers resolve the live traffic is to pass a “live” alias to Engine when your live traffic (live URLs) omits this parameter. You can add this parameter with the desired deployment ID on your live URLs and they will work similar to the Preview page.

While manually appending live URLs with the `d` parameter is possible, we don’t guarantee this method's availability and officially do not support it (see below notice).

Another thing to note here is that only on-deck deployments are valid preview-able deployments. Past deployments that are terminated will be not accessible and not be available for preview.

:::note
Using the `d` (or `v`) parameter is currently working, but it will be refactored with upcoming enhancements to Engine and is planned to be re-architected. Be aware of future change and use these parameters at your own risk when implementing them in your custom workflows. We suggest using Deployer UI and “Preview” buttons to access previews.
:::

In legacy PageBuilder versions, this parameter used to be `v`. It may work in some URLs but it is not supported and will be deprecated in the future releases.
