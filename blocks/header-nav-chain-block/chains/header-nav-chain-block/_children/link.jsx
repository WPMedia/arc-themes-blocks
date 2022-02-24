import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { formatURL } from "@wpmedia/engine-theme-sdk";

const Link = ({ href, name, child, isHidden = false }) => {
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const externalUrl = /(http(s?)):\/\//i.test(href);
	const linkAttributes = isHidden ? { tabIndex: -1 } : {};
	return externalUrl ? (
		<a href={formatURL(href)} target="_blank" rel="noopener noreferrer" {...linkAttributes}>
			{name}
			<span className="sr-only">{phrases.t("global.opens-in-new-window")}</span>
			{child}
		</a>
	) : (
		<a href={formatURL(href)} {...linkAttributes}>
			{name}
			{child}
		</a>
	);
};

export default Link;
