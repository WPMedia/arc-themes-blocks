---
inject: true 
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/index.story.jsx
before: "export default {"
---
import <%= h.changeCase.pascal(feature_name) %> from './features/<%= h.inflection.dasherize(feature_name) %>/default';
