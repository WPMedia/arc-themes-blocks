import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "fusion:context";
import { Grid, Stack } from "@wpmedia/arc-themes-components";

const LAYOUT_CLASS_NAME = "b-right-rail-advanced";

const useFeatureList = () => {
	const { renderables } = useAppContext();
	const featureList = {};
	renderables.forEach((renderable) => {
		if (renderable.collection === "sections") {
			featureList[renderable.props.id] = renderable.children.length || 0;
		}
	});
	return featureList;
};

const RightRailAdvancedLayout = ({ children }) => {
	const [
		navigation,
		fullwidth1,
		main,
		main2,
		rightRailTop,
		rightRailMiddle,
		rightRailBottom,
		fullWidth2,
		footer,
	] = React.Children.toArray(children);
	const featureList = useFeatureList();

	return (
		<div className={LAYOUT_CLASS_NAME}>
			{navigation ? (
				<Stack role="banner" className={`${LAYOUT_CLASS_NAME}__navigation`}>
					{navigation}
				</Stack>
			) : null}

			<section role="main" tabIndex="-1" className={`${LAYOUT_CLASS_NAME}__main`}>
				{fullwidth1 ? (
					<Stack className={`${LAYOUT_CLASS_NAME}__full-width-1`}>{fullwidth1}</Stack>
				) : null}

				<Grid className={`${LAYOUT_CLASS_NAME}__rail-container`}>
					<Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item`}>
						<Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item-1`}>{main}</Stack>
						<Stack className={`${LAYOUT_CLASS_NAME}__main-interior-item-2`}>{main2}</Stack>
					</Stack>
					<Stack role="complementary" className={`${LAYOUT_CLASS_NAME}__main-side-rail`}>
						<Stack className={`${LAYOUT_CLASS_NAME}__main-side-rail-top`}>{rightRailTop}</Stack>
						<Stack className={`${LAYOUT_CLASS_NAME}__main-side-rail-middle`}>
							{rightRailMiddle}
						</Stack>
						<Stack className={`${LAYOUT_CLASS_NAME}__main-side-rail-bottom`}>
							{rightRailBottom}
						</Stack>
					</Stack>
				</Grid>
				{featureList["7"] > 0 ? (
					<div className={`${LAYOUT_CLASS_NAME}__full-width-2`}>{fullWidth2}</div>
				) : null}
			</section>
			{footer ? <footer className={`${LAYOUT_CLASS_NAME}__footer`}>{footer}</footer> : null}
		</div>
	);
};

RightRailAdvancedLayout.propTypes = {
	children: PropTypes.array,
};

RightRailAdvancedLayout.sections = [
	"navigation",
	"fullwidth1",
	"main-1",
	"main-2",
	"rightrail-top",
	"rightrail-middle",
	"rightrail-bottom",
	"fullwidth2",
	"footer",
];

RightRailAdvancedLayout.label = "Advanced Right Rail – Arc Layout";

export default RightRailAdvancedLayout;
