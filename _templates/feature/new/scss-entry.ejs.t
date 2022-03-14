---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/_index.scss
---
@use "@wpmedia/arc-themes-components/scss";

.b-<%= h.inflection.dasherize(block_name) %> {
	@include scss.block-properties('<%= h.inflection.dasherize(block_name) %>');
}
