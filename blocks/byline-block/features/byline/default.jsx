import React from "react";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { Attribution, formatAuthors } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-byline";

const Byline = () => {
	const { arcSite, globalContent } = useFusionContext();
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");
	const bylineNodes = formatAuthors(globalContent?.credits?.by, phrases.t("byline-block.and-text"));

	return bylineNodes?.length > 0 ? (
		<Attribution className={`${BLOCK_CLASS_NAME}`}>
			<span className={`${BLOCK_CLASS_NAME}__by`}>{phrases.t("byline-block.by-text")}</span>{" "}
			<span className={`${BLOCK_CLASS_NAME}__names`}>{bylineNodes}</span>
		</Attribution>
	) : null;
};

Byline.label = "Byline – Arc Block";

Byline.icon = "user-question";

export default Byline;
