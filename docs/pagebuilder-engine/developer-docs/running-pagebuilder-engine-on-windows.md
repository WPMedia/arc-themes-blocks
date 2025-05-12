---
title: Running PageBuilder Engine on Windows
description: Running PageBuilder Engine on Windows
lastUpdated: 2023-07-18T19:45:29.000Z
migrationData:
  short_description: Running PageBuilder Engine on Windows
  number: KB0010459
  sys_id: 1163b2664748f590eee38788436d4331
  sys_created_on: '2023-07-18 15:45:08'
  sys_updated_on: '2023-07-18 15:45:29'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: 'PageBuilder Engine, Windows, Docker, WSL2, '
  topic: General
  sys_view_count: 210
  helpful_count: 0
  version: e6733a664748f590eee38788436d43f4
  display_number: KB0010459 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.290Z
---

PageBuilder Engine runs on Windows operating systems with standard configuration. There are differences between WSL (Windows Subsystem for Linux) versions when working on your bundle code. We suggest using WSL2 to run PageBuilder Engine which is more natively integrated with Docker Windows Desktop.

><a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank">DockerDocs: Install Docker Desktop on Windows
</a>

## Before running PageBuilder Engine

1. Ensure you are running on the latest version of Docker Desktop
2. Add `DB_ROOT=/data/mongo/` to the .env file

## Using WSL command line to run Engine

While using WSL2 for your baseline environment for PageBuilder Engine, it’s a good idea to stick with running your fusion-cli commands inside your WSL terminal instead of Microsoft Terminal (or Powershell) even though fusion-cli runs on windows shell will still communicate with docker properly. To do this, make sure you are in linux shell before running any fusion-cli commands.

## Manually creating zip for deployments

fusion zip doesn’t work on Windows. In order to deploy your bundle you will need to zip it first. As a workaround, to run the equivalent of zip on windows select all the files in the fusion folder **except** data, dist, mocks and `node_modules` and use the windows zip tool.

![Create zip for deployments](/images/pagebuilder-engine/create-zip-for-deployments.png)

## If the Engine not re-building automatically when files change - WSL1 vs WSL2 configuration

When running Engine through WSL, there are differences between WSL1 and WSL2. Engine works on both WSL versions but you need to make sure your bundle source is placed in the correct filesystem in each WSL version in order for webpack file watching to work.

* If you are using WSL1, make sure you place your files in Windows Filesystem (host) in order to get webpack file watching work.
* If you are using WSL2, your Engine bundle source needs to be placed inside the Linux OS filesystem in order to get webpack file watching working.
