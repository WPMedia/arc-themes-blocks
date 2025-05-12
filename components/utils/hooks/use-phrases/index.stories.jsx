import usePhrases from ".";

export default {
	title: "Utilities/Hooks/usePhrases",
	component: usePhrases,
};

export const DefaultUse = () => <div>{usePhrases().t("your_translation_key_here")}</div>;
