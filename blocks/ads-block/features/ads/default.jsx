import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
// todo: remove styled components
import styled from "styled-components";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

import adMap from "./ad-mapping";
import AdUnit from "./_children/AdUnit";
import ArcAdminAd from "./_children/ArcAdminAd";
import { getAdObject } from "./ad-helper";

// todo: remove and replace
import "./ads.scss";

function generateInstanceId(componentId) {
	return `${componentId}-${Math.floor(Math.random() * 9007199254740991).toString(16)}`;
}

// this can likely be removed without the istanbul ignore label visibility
// eslint-disable-next-line arrow-body-style
const setAdLabelVisibility = (props) => {
	// istanbul ignore next
	return props.displayAdLabel ? "" : "display: none";
};

// setting content in the div for admin?
// can be a paragraph rather than dynamic content
export const StyledAdUnit = styled.div`
	.arcad > [id^="google_ads_iframe"]:not(:empty)::before {
		content: "${(props) => props.adLabel}";
		display: block;
		${(props) => setAdLabelVisibility(props)}
	}

	.arcad > [id^="google_ads_iframe"]:empty[style] {
		width: 0 !important;
		height: 0 !important;
	}
`;

export const ArcAdDisplay = (props) => {
	// take in phrases content
	const {
		config,
		displayAdLabel,
		instanceId,
		isAdmin,
		isAMP,
		lazyLoad,
		propsWithContext,
		sizing,
		adLabel,
	} = props;
	return (
		<StyledAdUnit
			id={`arcad-feature-${instanceId}`}
			className="arcad-feature"
			adLabel={adLabel}
			displayAdLabel={!isAdmin && displayAdLabel && !isAMP()} // interesting logic here around amp
		>
			<div className="arcad-container" style={sizing}>
				{!isAdmin && !isAMP() && (
					<LazyLoad
						enabled={lazyLoad}
						offsetBottom={0}
						offsetLeft={0}
						offsetRight={0}
						offsetTop={200}
						// eslint-disable-next-line arrow-body-style
						renderPlaceholder={(ref) => {
							// istanbul ignore next
							return <div ref={ref} />;
						}}
					>
						<AdUnit adConfig={config} featureConfig={propsWithContext} />
					</LazyLoad>
				)}
				{isAdmin && <ArcAdminAd {...config} />}
			</div>
		</StyledAdUnit>
	);
};

const ArcAd = (props) => {
	const fusionContext = useFusionContext();
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const [instanceId] = useState(() => generateInstanceId(fusionContext.id || "0000"));
	const propsWithContext = {
		...fusionContext, // siteProperties: { dfpId } included in fusionContext
		...props,
		instanceId,
	};
	const { customFields, isAdmin, siteProperties } = propsWithContext;
	const { displayAdLabel, lazyLoad = true, reserveSpace = true } = customFields;
	const [config] = useState(
		getAdObject({
			...customFields,
			...propsWithContext,
		})
	);

	// we don't need to support amp so this can be removed
	// istanbul ignore next
	const isAMP = () => !!(propsWithContext.outputType && propsWithContext.outputType === "amp");

	const [width, height] = config.adClass ? config.adClass.split("x") : [];
	// Height is + 17px to account line-height of advertisement string of 17px;
	const heightWithAdjustments = parseInt(height, 10) + (displayAdLabel ? 17 : 0);

	const sizing = {
		maxWidth: `${width}px`,
		minHeight: reserveSpace ? `${heightWithAdjustments}px` : null,
	};

	// shows ADVERTISEMENT (en) string above the ad
	const adLabel = siteProperties?.advertisementLabel || phrases.t("ads-block.ad-label");

	return (
		<ArcAdDisplay
			config={config}
			displayAdLabel={displayAdLabel}
			instanceId={instanceId}
			isAdmin={isAdmin}
			isAMP={isAMP}
			lazyLoad={lazyLoad}
			phrases={phrases}
			propsWithContext={propsWithContext}
			sizing={sizing}
			adLabel={adLabel}
		/>
	);
};

/** PropTypes */

const adTypes = Object.keys(adMap);
const adTypeLabels = {};
adTypes.forEach((adType) => {
	adTypeLabels[adType] = adMap[adType].adLabel;
});

ArcAd.propTypes = {
	customFields: PropTypes.shape({
		adType: PropTypes.oneOf(adTypes).tag({
			name: "Ad Type",
			labels: adTypeLabels,
			defaultValue: "1x1",
			required: true,
			hidden: false,
		}),
		lazyLoad: PropTypes.boolean.tag({
			name: "Lazy Load Ad?",
			defaultValue: true,
		}),
		displayAdLabel: PropTypes.boolean.tag({
			name: "Display Advertisement Label?",
			defaultValue: true,
		}),
		reserveSpace: PropTypes.boolean.tag({
			name: "Reserve space for Ad",
			defaultValue: true,
		}),
	}),
};

ArcAd.label = "Google Ad – Arc Block";

ArcAd.icon = "arc-ads";

export default ArcAd;
