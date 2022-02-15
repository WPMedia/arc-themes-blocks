---
inject: true
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/intl.json
after: "{"
---
	"<%= h.inflection.dasherize(feature_name) %>-block.hello-text": {
		"de": "Hallo",
		"en": "Hello World",
		"es": "Hola Mundo",
		"fr": "Bonjour le monde",
		"ja": "こんにちは世界",
		"ko": "안녕하세요 세계",
		"no": "Hei Verden",
		"pt": "Olá Mundo",
		"sv": "Hej Verden"
	},