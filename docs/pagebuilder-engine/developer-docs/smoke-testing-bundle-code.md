---
title: Creating Smoke Test for your Bundle Code
description: Lightweight approach to control regression on your bundle code changes between deployments
lastUpdated: 2025-03-26T15:55:22.000Z
---

## What is Smoke Test?

Smoke tests are lightweight, high-level validations that confirm your application is functioning end-to-end after a deployment. Unlike full regression test suites, smoke tests are fast and outcome oriented —they don't aim to catch every edge case, but instead verify that the most critical reader-facing experiences still render successfully.

In the context of Arc XP, smoke tests can be particularly valuable because even minor changes in your bundle, global content sources, or resolver logic can result in end-user regressions that are hard to catch before content gets served in production. Running smoke tests after each deployment helps ensure your most important pages—like your homepage, section fronts, and high-traffic content templates—load without rendering failures or blank states.

Think of smoke tests as a post-deploy “sanity check” that confirms your digital experience is still operational. If any smoke test fails, you know immediately something in the rendering pipeline (bundle, configuration, or upstream content) has broken the reader experience and needs to be addressed before continuing further deployments or releases.

Even a simple validation like "did this article URL return a 200 and contain the expected headline?" can catch regressions that would otherwise result in poor SEO, broken social links, or confused readers. In other words, smoke tests don't replace your broader test strategy—they reinforce it, right where it matters most.

## What to Test

Eventually, your bundle powers your reader-facing site. But it’s not just the bundle—PageBuilder configuration and content source data matter too. On a mature, live site, most of this configuration remains stable over time—unless your editorial team actively hand-curates and publishes frequently. Even then, applying a smoke test approach helps validate that curation activities aren’t unintentionally breaking the reader experience.

So let’s work backwards—from the reader’s point of view. The ultimate outcome is simple: the page should render successfully. Which pages should you focus on?

- Homepage
- Section fronts
- Article detail pages  
- Detail pages for other content types (gallery, video, collections, etc.)

You can go as deep as you want, but the goal is broad surface coverage. Focus on high-traffic page types and high-impact pages. For instance, a single PageBuilder template might include 10 blocks and multiple content sources—and be responsible for rendering thousands of article URLs. In that case, testing a few representative URLs for that template is sufficient.

In contrast, pages like the homepage or section fronts carry more editorial weight and often include custom curation. These deserve explicit testing, even if they use fewer templates or simpler content structures.

## All You Need Is a List of URLs

### 1\. Manual curation

Start simple, compile a list of important URLs. You can do this manually. The point in smoke tests is not testing all URLs on your site, but having representation of different page/template/resolver combinations that balances, covering key pages, and key component, content sources.

### 2\. From analytics tools: `Top N high-traffic URLs`

automate an export of your top 50 most-visited pages to keep the tests dynamic.

Automated smoke tests that follow real traffic patterns give you higher confidence. They help ensure your highest-value pages are rendering successfully with each deploy. But there’s a catch—make sure the URLs in your list remain valid between test runs. Avoid test cases that rely on ephemeral content or pages likely to be unpublished or deleted by editorial teams.

Consistency matters. If your test suite breaks because a story expired or a page was unpublished, you’re introducing test flakiness—not reader protection.

### 3\. Sitemap file

Another way to dynamically do it is to test random URLs from your sitemaps. This can be truly random, or hybrid of manual + random URLs. Consider this as spot-checking your content.

## Simple Smoke Testing Script

Let’s use [arcxp.com](http://arcxp.com/) as an example. Here are list of URLs we hand-curated in `urls.txt` file:

```
https://www.arcxp.com/
https://www.arcxp.com/products/content-management/
https://www.arcxp.com/products/digital-subscriptions/
https://www.arcxp.com/solutions/digital-media/
https://www.arcxp.com/2025/03/18/how-news-organizations-can-elevate-audience-experiences/
https://www.arcxp.com/2025/01/29/streamlining-newsroom-workflows-for-maximum-creativity/
https://www.arcxp.com/partners/
https://www.arcxp.com/events/
```

This list contains key static pages, as well as dynamic content gets resolved by a resolver, a content source and template combination.

Here is the most basic shell script you can save it as `check_urls.sh` next to the `urls.txt` file:

```sh
#!/bin/bash
# Read URLs from file
urls=$(cat urls.txt)
# Initialize CSV file
output_file="results.csv"
echo "url,status" > $output_file
# Initialize exit status
exit_status=0
# Check each URL
for url in $urls; do
  # Add timestamp to URL to prevent caching
  timestamp=$(date +%s)
  if [[ $url == *\?* ]]; then
    url_with_token="${url}&token=${timestamp}"
  else
    url_with_token="${url}?token=${timestamp}"
  fi
  status_code=$(curl -o /dev/null -s -w "%{http_code}" "$url_with_token")
  if [ "$status_code" -eq 200 ]; then
    echo "✔ $url"
  else
    echo "✘ $url"
    exit_status=1
  fi
  # Write to CSV
  echo "$url,$status_code" >> $output_file
done
exit $exit_status
```

and run `sh check_urls.sh` which will get urls with forcing CDN Cache bypass so pages will be rendered, and script will print a check mark or x at the beginning of each url:

```sh
❯ sh check_urls.sh
✔ https://www.arcxp.com/
✔ https://www.arcxp.com/products/content-management/
✔ https://www.arcxp.com/products/digital-subscriptions/
✔ https://www.arcxp.com/solutions/digital-media/
✔ https://www.arcxp.com/2025/03/18/how-news-organizations-can-elevate-audience-experiences/
✔ https://www.arcxp.com/2025/01/29/streamlining-newsroom-workflows-for-maximum-creativity/
✔ https://www.arcxp.com/partners/
✔ https://www.arcxp.com/events/
```

Ok, this is good. Now we can use this approach in every before/after deployment whether locally, or on Arc XP environments.

## Automate in CI/CD, with alerts

If the list of URLs are high-confidence that will produce predictable "OK" result for all pages, then this script can even be automated in CI/CD before and after deployments.

In fact in almost all CI/CD tools, you can define action based on success or failure of this validation step, and choose to set up alerts (slack alert) or even push the envelope and implement automated rollback step, that can easily call Deployer API to promote-previously health bundle.

## Is 200 OK really mean everything is OK?

Better than not checking at all. But we want more assurance.

We’re not going to go deep to provide implementations of the following cases but things that can make your smoke tests more robust. And some of these things might not be great to do it in bash scripts. In that case, you may want to convert this shell script to a node.js script, and use your favorite http library, or dom-parser library to go deeper.

:::note[Tip 💡]
AI-editors (or ChatGPT) is exceptionally works well on these scripts. You can simply ask it to create or change this script, convert it to node.js, or implement what you want quickly.
:::

A few things we can do more on our “tests”:

### Check elements expected to be there in the page

In urls.txt, we can define array of expected text/string, and make our script check the response HTML if it contains everything we expect it to have.

This sounds logical, and make sense for some stuff. Especially parts of your page that doesn’t change (or changes rarely), and not tied to a dynamic content coming from content authoring tools. Example: A title text of a component, that will mean the component successfully executed its server-side render and returned without errors.

### Response size changes

Save response size, and measure if it changed before and after runs…

This can be out of our control easily though, because page size is heavily influenced by the actual content returned from content APIs.

For example, if you have a collection on your page, and the content source returns the ANS for each story, a new story published that has longer summary text will make the end HTML bigger, or opposite true too. So we can’t fully rely on this

### Client-side assets integrity, and size

While the previous point, of checking the server-side rendered HTML page size variable, and might not be the best place to check, checking PageBuilder generated resources like default.js, default.css, or chunks if you are doing code splitting is really helpful thing to do.

Assuming you don't often make changes that causes your bundle size to go up or down a lot, checking these asset sizes can be a very good mechanism to catch unintended dependency bloating your bundle. We explored client-side bundle optimization, monitoring techniques before in this guide: [How to optimize your PageBuilder Engine bundle size for better page load and render performance](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-optimize-your-pagebuilder-engine-bundle-size-for-better-page-load-and-render-performance.html). But you can also implement same or similar checks as part of your smoke tests, to make it more robust validation method.


### Going deep and technical with `window.Fusion` object contents

Check `window.Fusion` object and see if:

- it has features we want to render on this page, like, checking a feature configuration. Example a custom field value. 
- it successfully calls and caches content sources expected to be used in this page.
    

### Image Resizer Implementation

Another point to test more, is to check your images are resized correctly, or at least resized in any way. Seeing raw image URLs are often not good sign, it will make your page load slower, cause unnecessary download for your readers, and higher bandwidth usage and bills for your organization. Simply parsing all image tags, or URLs and seeing if they are signed resizer URLs can save you a lot of trouble.