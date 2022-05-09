import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "fusion:context";
import { Stack } from "@wpmedia/arc-themes-components";

const LAYOUT_CLASS_NAME = "b-right-rail";

const useFeatueList = () => {
	const { renderables } = useAppContext();
	const featureList = {};
	renderables.forEach((renderable) => {
		if (renderable.collection === "sections") {
			featureList[renderable.props.id] = renderable.children.length || 0;
		}
	});
	return featureList;
};

const RightRailLayout = ({ children }) => {
	const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
	const featureList = useFeatueList();

	return (
		<Stack className={LAYOUT_CLASS_NAME}>
			<Stack role="banner" className={`${LAYOUT_CLASS_NAME}__header`}>
				{navigation}
			</Stack>
			<Stack role="main" tabIndex="-1" className={`${LAYOUT_CLASS_NAME}__main`}>
				<div className={`${LAYOUT_CLASS_NAME}__main-item`}>{fullWidth1}</div>

				<div className={`${LAYOUT_CLASS_NAME}__rail-container`}>
					<div className={`${LAYOUT_CLASS_NAME}__main-interior-item`}>{main}</div>
					<aside className={`${LAYOUT_CLASS_NAME}__main-side-rail`}>{rightRail}</aside>
				</div>

				{featureList["4"] > 0 && (
					<div className={`${LAYOUT_CLASS_NAME}__extra-main-item`}>{fullWidth2}</div>
				)}
			</Stack>
			<Stack className={`${LAYOUT_CLASS_NAME}__footer`}>{footer}</Stack>
		</Stack>
	);
};

RightRailLayout.propTypes = {
	children: PropTypes.array,
};

RightRailLayout.sections = [
	"navigation",
	"fullwidth1",
	"main",
	"rightrail",
	"fullwidth2",
	"footer",
];

RightRailLayout.label = "Right Rail – Arc Layout";

export default RightRailLayout;
