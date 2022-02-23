import React from "react";
import { PrimaryFont } from "@wpmedia/shared-styles";
import { formatURL } from "@wpmedia/engine-theme-sdk";

import "./section-title.scss";

const Separator = "  \u00a0 • \u00a0  ";

// using the class twice to ensure the • and the text are both same font-size and
const styledLinkTmpl = (name, id, separator) => {
	const formattedURL = formatURL(id);

	return (
		<span key={id} className="section-title--styled-link">
			<PrimaryFont as="a" href={formattedURL} className="section-title--styled-link">
				{name}
			</PrimaryFont>
			{separator}
		</span>
	);
};

const SectionTitle = (props) => {
	const { content } = props;
	const showSeparator = !!(content && content.children && content.children.length > 1);

	return (
		!!(content && (content.name || content.display_name)) && (
			<>
				<PrimaryFont as="h1" className="section-title">
					{content.name || content.display_name}
				</PrimaryFont>
				<div className="section-container">
					{!!(content.children && content.children.length > 0) &&
						content.children.map(
							(child, index) =>
								(child.node_type &&
									child.node_type === "link" &&
									styledLinkTmpl(
										child.display_name,
										child.url,
										content.children.length !== index + 1 && showSeparator ? Separator : ""
									)) ||
								styledLinkTmpl(
									child.name,
									child._id,
									content.children.length !== index + 1 && showSeparator ? Separator : ""
								)
						)}
				</div>
			</>
		)
	);
};

export default SectionTitle;
