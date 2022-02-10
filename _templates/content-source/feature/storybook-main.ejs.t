---
inject: true # only inject if it exists
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/index.story.jsx
append: true
---
export const ShowIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: true }} />;

export const HideIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: false }} />;