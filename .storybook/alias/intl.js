import enPhrases from "../../locale/en.json";

const flatPhrases = Object.values(enPhrases).reduce(
	(acc, blockPhrases) => ({ ...acc, ...blockPhrases }),
	{},
);

export default () => ({
	t: (key, interpolations = {}) => {
		const template = flatPhrases[key] ?? key;
		return template.replace(/%\{(\w+)\}/g, (_, name) =>
			interpolations[name] !== undefined ? String(interpolations[name]) : `%{${name}}`,
		);
	},
});
