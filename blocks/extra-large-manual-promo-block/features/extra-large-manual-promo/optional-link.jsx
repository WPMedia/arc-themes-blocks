import React from "react";
import { useComponentContext } from "fusion:context";
import { formatURL, Link } from "@wpmedia/arc-themes-components";

const OptionalLink = ({ children, href, openInNewTab }) => {
	const { registerSuccessEvent } = useComponentContext();
	return href ? (
		<Link href={formatURL(href)} onClick={registerSuccessEvent} openInNewTab={openInNewTab}>
			{children}
		</Link>
	) : (
		children
	);
};

export default OptionalLink;
