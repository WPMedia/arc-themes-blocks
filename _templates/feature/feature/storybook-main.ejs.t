---
inject: true
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/index.story.jsx
append: true
---
export const ShowIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: true }} />;

export const HideIcon = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showIcon: false }} />;
