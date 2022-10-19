import React from "react";
import { useFusionContext } from "fusion:context";

import { usePhrases } from "@wpmedia/arc-themes-components";

import PrimaryFont from "../primary-font";
import SecondaryFont from "../secondary-font";
import "./index.scss";

const DEFAULT_FONT = "Secondary";

const Byline = (props) => {
	const {
		content = {},
		className = "",
		separator = false,
		list = false,
		font = DEFAULT_FONT,
	} = props;
	const { globalContent } = useFusionContext();
	const phrases = usePhrases();

	const FontType = font === DEFAULT_FONT ? SecondaryFont : PrimaryFont;

	const by = content?.credits?.by || globalContent?.credits?.by || [];
	const authors =
		by.length > 0 &&
		by
			.map((author) => {
				if (author.type === "author") {
					/* eslint-disable-next-line camelcase */
					const authorName = author?.additional_properties?.original?.byline || author?.name;
					const hasURL = author?.url;

					// If the author has a url to their bio page, return an anchor tag to the bio.
					// If not, just return the string.
					if (authorName) {
						return hasURL ? `<a href="${author.url}">${authorName}</a>` : authorName;
					}
					// Those without name will not be included in the byline
				}

				return null;
			})
			.filter((author) => author != null);

	const numAuthors = authors.length;
	// This will be an innerHTML to accommodate potential multiple anchor tags within the section
	// Leave it empty so that if there's no author with listed name it would just return '' string
	// note: default is empty string with one space
	let bylineString = " ";

	// Depending on how many authors there are, change style accordingly
	if (numAuthors) {
		switch (numAuthors) {
			case 1: {
				bylineString += `${authors[0]}`;
				break;
			}
			case 2: {
				bylineString += `${authors[0]} ${phrases.t("byline.and-text")} ${authors[1]}`;
				break;
			}
			default: {
				// Iterate through each of the authors until the last two
				for (let i = 0; i < numAuthors - 2; i += 1) {
					bylineString += `${authors[i]}, `;
				}

				// Add last two authors in Oxford comma style
				bylineString = `${bylineString}${authors[numAuthors - 2]} ${phrases.t("byline.and-text")} ${
					authors[numAuthors - 1]
				}`;
				break;
			}
		}
	}

	// note: default is empty string with one space
	// would not want to return 'by' all by itself unless it's by Anonymous ;)
	if (bylineString === " ") {
		return null;
	}

	return bylineString !== " " ? (
		<FontType as="section" className={`ts-byline ${className} ${list ? "ts-byline--list" : ""}`}>
			<span className="ts-byline__by">{phrases.t("byline.by-text")}</span>
			<span className="ts-byline__names" dangerouslySetInnerHTML={{ __html: bylineString }} />
			{separator && bylineString !== " " ? <span className="dot-separator">&#9679;</span> : null}
		</FontType>
	) : null;
};

export default Byline;
