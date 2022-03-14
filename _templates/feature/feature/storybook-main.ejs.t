---
inject: true
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/index.story.jsx
append: true
---
export const showHeading = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showHeading: true }} />;

export const hideHeading = () => <<%= h.changeCase.pascal(feature_name) %> customFields={{ showHeading: false }} />;
