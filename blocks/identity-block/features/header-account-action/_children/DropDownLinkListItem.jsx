import React from "react";
import styled from "styled-components";
import getThemeStyle from "fusion:themes";
import { useFusionContext } from "fusion:context";

import "./DropDownLinkListItem.scss";

const StyledLinkWithHover = styled.a`
	font-family: ${({ font }) => font};
	color: ${({ primaryColor }) => primaryColor};
	cursor: pointer;

	&:hover {
		color: ${({ primaryColor }) => primaryColor};
	}
`;

function DropDownLinkListItem(props) {
	const { arcSite } = useFusionContext();
	const { text, href } = props;
	const primaryColor = getThemeStyle(arcSite)["primary-color"];
	const font = getThemeStyle(arcSite)["primary-font-family"];

	return (
		<li className="xpmedia-subs-header-dropdown-list-item">
			<StyledLinkWithHover
				className="xpmedia-subs-header-dropdown-list-item-link"
				href={href}
				primaryColor={primaryColor}
				font={font}
				{...props}
			>
				{text}
			</StyledLinkWithHover>
		</li>
	);
}

export default DropDownLinkListItem;
