import React from "react";
import PropTypes from "prop-types";
import { formatURL } from "@wpmedia/engine-theme-sdk";

const Link = ({ href, name }) => {
	const externalUrl = /(http(s?)):\/\//i.test(href);

	return externalUrl ? (
		<a href={formatURL(href)} target="_blank" rel="noopener noreferrer">
			{`${name}`}
			<span className="sr-only">(Opens in new window)</span>
		</a>
	) : (
		<a href={formatURL(href)}>{`${name}`}</a>
	);
};

Link.propTypes = {
	href: PropTypes.string,
	name: PropTypes.string,
};

export default Link;
