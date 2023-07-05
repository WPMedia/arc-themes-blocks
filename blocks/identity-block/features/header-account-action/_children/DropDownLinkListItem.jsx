import React from "react";
import { Link } from "@wpmedia/arc-themes-components";

function DropDownLinkListItem(props) {
	const { text, href, blockClassName, ...rest } = props;

	return (
		<li className={`${blockClassName}__dropdown-list-item`}>
			<Link href={href} {...rest}>
				{text}
			</Link>
		</li>
	);
}

export default DropDownLinkListItem;
