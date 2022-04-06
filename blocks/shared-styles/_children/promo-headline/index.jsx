/* eslint-disable react/jsx-no-target-blank */
// Disabled eslint due to it not being able to handle the ternary logic
import React from "react";
import { useEditableContent } from "fusion:content";
import { useComponentContext, useFusionContext } from "fusion:context";
import Heading from "../headings/heading";

const PromoHeadline = (props) => {
	const {
		content = {},
		text,
		link,
		className = "",
		linkClassName = "",
		headingClassName = "",
		newTab = false,
		editable = true,
	} = props;
	const { editableContent } = useEditableContent();
	const { registerSuccessEvent } = useComponentContext();
	const { arcSite } = useFusionContext();

	const linkURL = content?.websites?.[arcSite]?.website_url || link;
	const linkText = content?.headlines?.basic || text;

	const editableItem =
		content?.headlines && editable ? editableContent(content, "headlines.basic") : {};

	return linkText ? (
		<div className={`promo-headline ${className}`}>
			<Heading className={headingClassName} {...editableItem} suppressContentEditableWarning>
				<a
					href={linkURL}
					target={newTab ? "_blank" : "_self"}
					rel={newTab ? "noreferrer noopener" : ""}
					className={linkClassName}
					onClick={registerSuccessEvent}
				>
					{linkText}
				</a>
			</Heading>
		</div>
	) : null;
};

export default PromoHeadline;
