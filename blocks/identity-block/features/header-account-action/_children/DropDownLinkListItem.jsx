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
	const { text, href, blockClassName } = props;
	const primaryColor = getThemeStyle(arcSite)["primary-color"];
	const font = getThemeStyle(arcSite)["primary-font-family"];

	return (
		<li className={`${blockClassName}__dropdown-list-item`}>
			<StyledLinkWithHover href={href} primaryColor={primaryColor} font={font} {...props}>
				{text}
			</StyledLinkWithHover>
		</li>
	);
}

export default DropDownLinkListItem;
