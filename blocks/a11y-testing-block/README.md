# `@wpmedia/a11y-testing-block`

## Important:  This a diagnostic block that should only be used in local and staging environments.  Do not use in production.
### This diagnostic block helps to audit and assist in finding accessibility (a11y) errors on a page
This block should only be used for local and staging environments as it will add significant overhead both in
bundle and performance respects. This block provides several configuration options that can be changed 
in the PageBuilder environment:

1) Show A11y UI:  By default, this control will only show the errors in the console of the browser.  When not using the 
UI interactive panel, it is recommended to use the Chrome browser.  If this setting is enabled, then a control button will be placed 
on your page that when clicked will open/close the issue panel where you can see the a11y issues found.
2) UI Panel Trigger Control:  If have `Show A11y UI` set to `true`, then you can decide where to place the control button that
opens and closes the issue panel.  The button can be placed in one of the four corners of the page, however the issue panel will always 
be displayed on the right side when it is open.
3) WCAG A11y Levels: Choose the WACG (Web Content Accessibility Guidelines) level you want to target.  The default setting of
`Level AA` is recommended.  More information on the different types of WCAG levels and what they target can be found here: 
https://www.w3.org/WAI/WCAG21/quickref/
4) Include additional best practices: Enabled by default.  This adds additional best practice checks during the audit that are not in the 
WCAG at this time, but help to improve a11y concerns. It is recommended to keep this setting on.
