import React from "react";

import { useFusionContext } from "fusion:context";

import { Attribution, formatAuthors, usePhrases } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-byline";

const Byline = () => {
	const { globalContent } = useFusionContext();
	const phrases = usePhrases();
	const bylineNodes = formatAuthors(globalContent?.credits?.by, phrases.t("global.and-text"));

	return bylineNodes?.length > 0 ? (
		<Attribution className={`${BLOCK_CLASS_NAME}`}>
			<span className={`${BLOCK_CLASS_NAME}__by`}>{phrases.t("global.by-text")}</span>{" "}
			<span className={`${BLOCK_CLASS_NAME}__names`}>{bylineNodes}</span>
		</Attribution>
	) : null;
};

Byline.label = "Byline – Arc Block";

Byline.icon = "user-question";

export default Byline;
