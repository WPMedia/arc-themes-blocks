---
title: What does the PageBuilder local development stack look like?
description: What does the PageBuilder local development stack look like?
lastUpdated: 2023-10-12T23:31:31.000Z
migrationData:
  short_description: What does the PageBuilder local development stack look like?
  number: KB0011213
  sys_id: 21ef5a1247b5f110eee38788436d43f7
  sys_created_on: '2023-10-12 19:31:21'
  sys_updated_on: '2023-10-12 19:31:31'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 143
  helpful_count: 0
  version: 44ffda1247b5f110eee38788436d43aa
  display_number: KB0011213 v5.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.272Z
---

## Why Docker?

PageBuilder infrastructure consists of multiple micro services within Arc XP infrastructure and Docker helps to simulate this environment very close to how client sites run on Arc XP in order to give client developers a near-production development environment.

## Why so many containers?

When running PageBuilder locally, fusion-cli orchestrates multiple Docker containers to simulate the PageBuilder stack locally. All containers are currently considered required to run Engine locally.

We acknowledge that not all containers may be needed for certain use cases (i.e: if client developers are running Engine to test a page’s render end to end, they perhaps don’t need to wait for PageBuilder Editor UI to start). We’re looking to provide more ways to customize which containers run for more optimized system resource usage and runtime speeds.

## Which containers run locally?

Docker containers run on local development environments when running the `npx fusion start` command:

| **Container Name**| **Logged out to CLI by default**| **What does this container do?**|
| --- | --- | --- |
| `fusion-engine` | YES | Renders your website |
| `fusion-webpack` | YES | Compiles customer components |
| `fusion-resolver` | NO | Translates request URI to a PageBuilder page/template with content |
| `fusion-origin` | NO | Application proxy to route local HTTP requests to the correct container |
| `fusion-content-cache` | NO | memcached instance that caches content |
| `fusion-cache-proxy` | NO | memcached interface for fusion-engine |
| `fusion-data` | NO | DB persistence layer which stores Pages, Templates, Resolvers, and edits to pages |
| `fusion-admin` | NO | Allows PageBuilder Editor to run locally |
| `fusion-cli-api` | NO | Enables Arc integrations (such as Photo, Video, and Story search) within PageBuilder Editor |

## Container Logs in CLI output

Starting with Engine 4.0.5 release, PageBuilder team optimized log output of Engine when running locally, turning off logs from the containers that are truly internal, and are not relevant or helpful for client-developers to see. Containers above with logging enabled by default to command line output will print all logs produced from these containers.

To enable all logs from all containers, add `--verbose` parameter when running fusion start.