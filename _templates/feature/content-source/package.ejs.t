---
inject: true
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/package.json
after: "files"
---
		"sources",