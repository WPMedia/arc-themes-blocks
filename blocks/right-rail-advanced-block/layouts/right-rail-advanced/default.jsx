import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "fusion:context";
import "./default.scss";

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
	] = children;
	const featureList = useFeatureList();

	return (
		<>
			<header className="page-header">{navigation}</header>
			<section role="main" id="main" className="main" tabIndex="-1">
				<div className="container layout-section">
					<div className="row">
						<div className="col-sm-xl-12 layout-section wrap-bottom">{fullwidth1}</div>
					</div>
					<div className="row advanced-grid">
						<section className="col-sm-md-12 col-lg-xl-8 advanced-grid-desktop-main-area">
							<RenderChild Item={main} tabletPlacement="2" />
							<RenderChild Item={main2} tabletPlacement="4" />
						</section>
						<section className="col-sm-md-12 col-lg-xl-4 layout-section">
							<RenderChild Item={rightRailTop} tabletPlacement="1" />
							<RenderChild Item={rightRailMiddle} tabletPlacement="3" />
							<RenderChild Item={rightRailBottom} tabletPlacement="5" />
						</section>
					</div>
					{featureList["7"] > 0 && (
						<div className="row">
							<div className="col-sm-xl-12 layout-section wrap-bottom">{fullWidth2}</div>
						</div>
					)}
				</div>
			</section>
			<footer>{footer}</footer>
		</>
	);
};

const RenderChild = ({ Item, tabletPlacement }) => (
	<div className={`advanced-grid-${tabletPlacement} layout-section`}>{Item}</div>
);

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
