---
inject: true # only inject if it exists
to: blocks/<%= h.inflection.dasherize(block_name) %>-content-source-block/index.story.jsx
before: "export default {"
---
import <%= h.changeCase.pascal(feature_name) %> from './features/<%= h.inflection.dasherize(feature_name) %>/default';