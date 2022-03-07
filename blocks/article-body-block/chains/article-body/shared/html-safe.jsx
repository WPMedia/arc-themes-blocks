/* eslint-disable import/no-unresolved */
/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";

const HtmlSafe = ({
	allowedAttributes,
	allowedTags,
	content,
	compType,
	transformTags,
	...remainingProps
}) => {
	const Comp = compType || "span";
	if (!content || typeof content !== "string") return <Comp />;

	const defaultAllowedTags = sanitizeHtml.defaults.allowedTags.concat([
		"h1",
		"h2",
		"amp-iframe",
		"style",
	]);
	const defaultAllowedAttrs = {
		...sanitizeHtml.defaults.allowedAttributes,
		"*": ["data-*"],
	};

	const cleanContent = sanitizeHtml(content, {
		allowedTags: allowedTags == null ? defaultAllowedTags : allowedTags,
		allowedAttributes: allowedAttributes == null ? defaultAllowedAttrs : allowedAttributes,
		transformTags,
	});

	const newElement = (
		<Comp {...remainingProps} dangerouslySetInnerHTML={{ __html: cleanContent }} />
	);

	return newElement;
};

HtmlSafe.propTypes = {
	allowedAttributes: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	allowedTags: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	content: PropTypes.string,
	compType: PropTypes.string,
	transformTags: PropTypes.object,
};

export default HtmlSafe;
