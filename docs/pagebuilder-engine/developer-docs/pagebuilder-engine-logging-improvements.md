---
title: 'Logging Improvements'
description: 'PageBuilder Engine: Logging Improvements'
lastUpdated: 2023-07-18T19:37:18.000Z
migrationData:
  short_description: 'PageBuilder Engine: Logging Improvements'
  number: KB0010461
  sys_id: 21713ea24748f590eee38788436d43a4
  sys_created_on: '2023-07-18 15:36:41'
  sys_updated_on: '2023-07-18 15:37:18'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, logging, cache, content, database, render,
    OVERRIDE_THRESHOLDS, LOG_METRICS,
  topic: General
  sys_view_count: 92
  helpful_count: 0
  version: aa9132e24748f590eee38788436d43f7
  display_number: KB0010461 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.240Z
---

We've added new metrics for feature developers on PB Engine that help to expose underlying performance drivers. These metrics will be used by Arc to help diagnose performance and stability related issues.

**Cache**- Enabling logging for request information from fusion-engine to the Arc managed cache proxy content fetched in a webpage rendering.

* Status written as success, stale, or miss
* Latency in ms
* Size in bytes
* Content source name

Cache metrics will appear in logs for requests with either:

* Fetch latency greater than an Arc-managed threshold (ex: 250ms)
* Response size great greater than an Arc-managed threshold (ex: 1mb)

**Content** - Enabling logging for request information from fusion-engine to customer specified content sources.

* Status written as success, stale, or miss
* Latency in ms
* Size in bytes
* Content source name

Content fetch metrics will appear in logs for requests with either:

* Fetch latency greater than an Arc-managed threshold (ex: 2500ms)
* Response size great greater than an Arc-managed threshold (ex: 1mb)

**Database** - Enabling logging for database requests from fusion-engine to the database that stores pages and templates.

* Latency in ms

Database fetch metrics will appear in the logs for requests with:

* Fetch latency greater than an Arc-managed threshold (ex: 500ms)

**Render** - Enabling logging of the time it takes for an individual component to render during the webpage request flow.

* Latency in ms
* Component name

Component rendering metrics will appear in the logs for requests with:

* Render latency greater than an Arc-managed threshold (ex: 100ms)

In **local** environments, developers are also free to modify their own metrics logging for thresholds, using two **environment variables:**

* `OVERRIDE_THRESHOLDS` - JSON object containing name/value pairs to describe the minimum value for a metric to be logged.
* `LOG_METRICS` - Flag for allowing or suppressing all metrics logging.

:::note
Environment variables are defined in file `.env` for the local environment, and in the `/environment/` directory for other environments.
:::

## `LOG_METRICS`

Defaults to true. Changing this to false will prevent all logging of metrics. Example: `LOG_METRICS=false`

## `OVERRIDE_THRESHOLDS`

Defaults to empty. Changing this to add override thresholds will cause the subject metric to be logged only when its value equals or exceeds the given threshold. Example: `OVERRIDE_THRESHOLDS={ “render.latency”: 500, “db.latency”: 20 }`

Omit the prefix “arc.fusion.” when specifying the metric name.

Available metrics:

* cache.latency
* cache.bytes
* compile.latency
* content.latency
* db.latency
* render.latency
