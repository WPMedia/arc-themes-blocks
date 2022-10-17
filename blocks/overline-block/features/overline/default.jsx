import React from "react";
import { useFusionContext } from "fusion:context";
import { formatURL, Overline as OverlineOutput, usePhrases } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-overline";

const Overline = () => {
	const { globalContent, arcSite } = useFusionContext();
	const phrases = usePhrases();

	const sourceContent = globalContent || {};

	const {
		display: labelDisplay,
		url: labelUrl,
		text: labelText,
	} = (sourceContent.label && sourceContent.label.basic) || {};
	const shouldUseLabel = !!labelDisplay;

	const { _id: sectionUrl, name: sectionText } =
		(sourceContent.websites &&
			sourceContent.websites[arcSite] &&
			sourceContent.websites[arcSite].website_section) ||
		{};

	// Default to websites object data
	let [text, url] = [sectionText, sectionUrl];

	if (sourceContent?.owner?.sponsored) {
		text = sourceContent?.label?.basic?.text || phrases.t("global.sponsored-content");
		url = null;
	} else if (shouldUseLabel) {
		[text, url] = [labelText, labelUrl];
	}

	return url || text ? (
		<OverlineOutput href={url ? formatURL(url) : null} className={BLOCK_CLASS_NAME}>
			{text}
		</OverlineOutput>
	) : null;
};

Overline.label = "Overline – Arc Block";

Overline.icon = "arc-overline";

export default Overline;
