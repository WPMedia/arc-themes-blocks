import React, { useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import { LazyLoad, Paragraph, Stack, usePhrases } from "@wpmedia/arc-themes-components";
import adMap from "./ad-mapping";
import AdUnit from "./_children/AdUnit";
import ArcAdminAd from "./_children/ArcAdminAd";
import { getAdObject } from "./ad-helper";

const BLOCK_CLASS_NAME = "b-ads-block";

function generateInstanceId(componentId) {
	return `${componentId}-${Math.floor(Math.random() * 9007199254740991).toString(16)}`;
}

export const ArcAdDisplay = (props) => {
	const {
		config,
		displayAdLabel,
		instanceId,
		isAdmin,
		isAMP,
		lazyLoad,
		propsWithContext,
		sizing, // provides max width and min height to prevent excessive layout shift
		adLabel,
	} = props;

	// ads will not show if output type is "amp" or on pagebuilder editor admin
	const showAd = !isAdmin && !isAMP();

	const showAdLabel = showAd && displayAdLabel;

	return (
		<Stack id={`arcad-feature-${instanceId}`} className={BLOCK_CLASS_NAME} alignment="center">
			{showAdLabel ? <Paragraph>{adLabel}</Paragraph> : null}
			{showAd ? (
				<div style={sizing}>
					<LazyLoad
						enabled={lazyLoad}
						offsetBottom={0}
						offsetLeft={0}
						offsetRight={0}
						offsetTop={200}
						renderPlaceholder={(ref) => <div data-testid="lazy-load-placeholder" ref={ref} />}
					>
						<AdUnit adConfig={config} featureConfig={propsWithContext} />
					</LazyLoad>
				</div>
			) : null}
			{/* admin view will show placeholder regardless of output type name amp */}
			{isAdmin ? <ArcAdminAd {...config} /> : null}
		</Stack>
	);
};

const ArcAd = (props) => {
	const fusionContext = useFusionContext();
	const phrases = usePhrases();
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

	const sizing = {
		maxWidth: `${width}px`,
		minHeight: reserveSpace ? `${height}px` : null,
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
