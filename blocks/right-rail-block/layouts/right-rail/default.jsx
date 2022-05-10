import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "fusion:context";
import { Grid, Stack } from "@wpmedia/arc-themes-components";

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
		<div className={LAYOUT_CLASS_NAME}>
			{navigation ? (
				<Stack role="banner" className={`${LAYOUT_CLASS_NAME}__navigation`}>
					{navigation}
				</Stack>
			) : null}

			<section role="main" tabIndex="-1" className={`${LAYOUT_CLASS_NAME}__main`}>
				{fullWidth1 ? (
					<Stack className={`${LAYOUT_CLASS_NAME}__full-width-1`}>{fullWidth1}</Stack>
				) : null}

				<Grid className={`${LAYOUT_CLASS_NAME}__rail-container`}>
					<Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item`}>{main}</Stack>
					<Stack role="complementary" className={`${LAYOUT_CLASS_NAME}__main-side-rail`}>
						{rightRail}
					</Stack>
				</Grid>

				{featureList["4"] > 0 ? (
					<div className={`${LAYOUT_CLASS_NAME}__full-width-2`}>{fullWidth2}</div>
				) : null}
			</section>
			{footer ? <footer className={`${LAYOUT_CLASS_NAME}__footer`}>{footer}</footer> : null}
		</div>
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
