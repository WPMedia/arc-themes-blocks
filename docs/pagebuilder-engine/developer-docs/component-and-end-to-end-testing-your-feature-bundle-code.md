---
title: Component and end-to-end testing your feature bundle code
description: Component and end-to-end testing your feature bundle code
lastUpdated: 2023-05-02T00:21:54.000Z
migrationData:
  short_description: Component and end-to-end testing your feature bundle code
  number: KB0011040
  sys_id: 9ab5c265c366a1101fe095ff05013133
  sys_created_on: '2023-05-01 20:21:50'
  sys_updated_on: '2023-05-01 20:21:54'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 145
  helpful_count: 0
  version: 97b686a5c366a1101fe095ff050131fd
  display_number: KB0011040 v1.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.274Z
---

## Testing strategies

Shipping software fast at scale requires confidence. How do you become more confident with software? Tests, and test automation.

While there is no perfect testing framework, it’s up to you to design your own testing strategy. Often it is a hybrid approach that has a different implementation of what you are testing.

A wholesome testing approach covers various components with their best testing frameworks.

![Testing Components](/images/pagebuilder-engine/testing-components.jpg)

Three key areas deserve consideration in their own worlds.

- **Testing presentation of content**
  - This is probably the most deterministic part of the testable parts of your codebase. Your react components render predictably, and it’s very easy to test them.
- **Testing data handling**
  - Similar to the presentation layer, you should already have modularized your content sources to test them under many conditions. You need additional care to cover many edge cases, like slow API responses, different error codes, and logical scenarios around how data is expected and potential ways that can differ. It is still easier to cover these cases in an abstract testing framework.
- **Testing workflow behaviors**
  - The third category of tests should cover how the rest of Arc XP tools come together with PageBuilder and IFX and how your code receives what it needs from other Arc XP services, like Site Service, Author Service configuration, or parameters determined within PageBuilder, like custom fields. To test these, you may need to utilize an end-to-end testing framework to simulate these scenarios within Arc XP environments.

Getting testing coverage to a desirable state is hard. It requires time and investment. But it’s best and may be the only way to have higher confidence in software integrity and stability when shipping any change. It's a necessity, especially for teams wanting to move fast.

## Frameworks

While there are many frameworks for different testing methods (unit, component, e2e), we’d like to highlight [Cypress](https://cypress.io/), which Arc XP uses in our development processes to leverage two powerful testing methods. Cypress is an open-source testing framework that uses cloud services for running tests in the cloud. It has distributed test runners if you want to utilize those capabilities, but it can also run in any environment with a self-hosted set up. Cypress comes with both component testing and end-to-end testing.

## See it in action

<video width="800" height="500" controls>
  <source src="/images/pagebuilder-engine/cypress.mp4" type="video/mp4">
</video>

## Sample Cypress E2E Test Spec File

The previous video is a single, simple test spec file that is easy to understand and includes many of the components in your bundle, with key behaviors like:

- A page’s final render output
  - Is my page rendering correctly?
- A content source’s /pf/api/fetch/... API call your page makes to refresh the content on the client-side render
  - Are my content sources functioning properly for client-side rendering?
- List of pages in PageBuilder Editor
  - Are all pages I need present in PageBuilder?
- A feature’s custom field appears in a sample in PageBuilder Editor
  - Is my editorial staff seeing the correct custom fields and do their interactions with custom fields work properly? (for example, date type custom field showing date picker)
- Changes to that custom field are reflected accurately in the render preview in the PageBuilder Editor preview panel
  - Is my page working accurately in PageBuilder Editor preview, so my staff members who work on curation properly interact with my page in Admin mode?
- Observing your content source’s query change in page render.
  - Is my content source actually getting the data it is expected to get?

Here is the Cypress test spec file:

```js
const URL_STANDALONE_PAGE = 'http://localhost/pf/engine-test/?_website=the-gazette'
const URL_CS_SUCCESSFUL = 'http://localhost/pf/api/v3/content/fetch/country?query=%7B%22code%22%3A%22FR%22%7D&_website=the-gazette'
const URL_PB_EDITOR_PAGES = 'http://localhost/pagebuilder/pages'

describe('engine and editor', () => {
  it('engine can render a standalone page', () => {
    cy.visit(URL_STANDALONE_PAGE)
    cy.contains('Raw HTML').should('be.visible')
  })

  it('engine content source /pf/api call returns successful response', () => {
    cy.request(URL_CS_SUCCESSFUL).as('response')
    cy.get('@response').its('status').should('eq', 200)
    cy.get('@response').its('body').should('have.property', 'name')
    cy.get('@response').its('body').its('name').should('eq', 'France')
  })

  it('editor render list of pages', () => {
    cy.visit(URL_PB_EDITOR_PAGES)
    cy.get('.browser__list').find('.page__actions__dropdown')
      .should('have.length.greaterThan', 2)
  })

  it('editor updates on custom fields are reflected in the preview', () => {
    cy.visit(URL_PB_EDITOR_PAGES)
    cy.contains('Engine Test').click()

    // Make a change in a custom field
    cy.get('#editor-panel', { timeout: 30000 }).contains('global DisplayCountry').click()
    cy.contains('Country Code').parent().parent().find('input').clear().type('DE{enter}')

    // Observe the preview picked up the change with re-render
    cy.iframe('#editor-preview-iframe').contains('Germany', { timeout: 10000 })
      .should('be.visible')

    // Make one more change
    cy.contains('Country Code').parent().parent().find('input').clear().type('FR{enter}')
    cy.iframe('#editor-preview-iframe').contains('France', { timeout: 10000 })
      .should('be.visible')
  })
})
```

## Full Sample Code

You can find this sample with a full Cypress starter configuration in this repo: 

[https://github.com/WPMedia/pb-sample-cypress-e2e-tests](https://github.com/WPMedia/pb-sample-cypress-e2e-tests)

This code is a good place to start, and you can expand your test scenarios and implementation to increase your test coverage.
