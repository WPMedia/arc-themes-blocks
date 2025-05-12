---
title: Local Mocks
description: Local Mocks
lastUpdated: 2024-06-04T00:02:30.000Z
migrationData:
  short_description: Local Mocks
  number: KB0010475
  sys_id: 6383348647ea0610a87626c2846d43f3
  sys_created_on: '2024-06-03 19:57:46'
  sys_updated_on: '2024-06-03 20:02:30'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: PageBuilder Engine, Local Mocks, Service Worker, resources folder
  topic: General
  sys_view_count: 486
  helpful_count: 0
  version: 81a43c0a47ea0610a87626c2846d43f7
  display_number: KB0010475 v6.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.373Z
---

During development, sometimes you need to mock resources locally. The system serves anything inside of the `/mocks` folder from the root of your website when developing locally. This functionality exists to make local development more convenient, but note that mock resources are not available in Production.

## Mocking Sites from your Sandbox or Production environments

When running PageBuilder locally, by default, no sites are defined. You configure your sites in Site Service for Arc XP environments. In order to replicate the list of sites and sections you have, you must copy the response of the Site Service’s Arc Admin API response.

1. Log in to Arc XP.
2. Open your browser’s developer tools and navigate to network tab and type `website` in the filter box in network panel. This shows the site service API call after the next step.
3. Click **PageBuilder Editor**. Your Pages page opens, displaying the site service call to your arcpublishing domain. (Ensure you are in the environment you want to copy site service settings from. If you are not in the right environment, open the Arc XP navigation and switch to the environment you want). 
4. Click the **Response** tab of this request.
5. Copy the contents of this network response to your local mock file for the site service, which is located in the `/mocks/siteservice/api/v3/website` file. This file corresponds to the API call you copied the request from.
6. Save this file. Your PageBuilder Editor and Engine start using the site service configuration you copied in your local instance.

### Disabling Privacy Banner

You may want to turn off Arc XP’s Privacy Banner in your local environment to minimize distractions. The banner has no function locally, and, as a result, you cannot permanently dismiss the banner by clicking either Reject or Accept while working in your local PageBuilder instance. To disable the banner permanently, add the `"tracking": false` property to your mocked user object in `./mocks/user`.

## Service Workers

One use case for the `/mocks` folder is to install a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) at the root scope of your website. You can mock this functionality by placing the service worker script inside the `/mocks` folder of our feature pack. This allows you to customize and test the service worker locally.

## Moving to Production

If resources are required for your Production website, we recommend that those resources are moved to the `/resources` folder of your feature pack. For resources that must be located at the root of your website, the Arc Delivery team can configure your Content Delivery Network to ensure that specific resources are served from the correct location.

## Mocking permissions

Your local environment is disconnected from Arc XP's permissions system. Without mocking the permissions, you are not be able to perform any changes to your local environment. When you receive the initial bundle from Arc XP, a file appears in `./mocks/user`. The permissions in that file are the permissions you need when you first join Arc XP. Over time, you likely add or remove permissions.

For you to have full access in your local environment, use the following updated list and override the content in `./mocks/user`:

```json
{
  "displayName": "Local Fusion Developer",
  "permissions": {
    "PageBuilder": {
      "global": [
        "W",
        "D",
        "P",
        "VRP",
        "ERP",
        "DT",
        "RE",
        "RD"
      ]
    }
  }
}
```
