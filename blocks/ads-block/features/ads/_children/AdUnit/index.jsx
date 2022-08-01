import React, { useEffect, useCallback } from "react";
import PropTypes from "@arc-fusion/prop-types";
import ArcAdsInstance from "../ArcAdsInstance";
import { setPageTargeting } from "../../ad-helper";

const AdUnit = (props) => {
	// featureConfig is called propsWithContext in the default.jsx
	// propsWithContext must include dfp in the fusionContext object
	const { adConfig, featureConfig } = props;
	const { id, adClass } = adConfig;
	const {
		customFields: { debug },
		isAdmin,
		siteProperties,
	} = featureConfig;

	const registerAd = useCallback(() => {
		const publisherIds = { dfp_publisher_id: siteProperties.dfpId };
		ArcAdsInstance.getInstance(siteProperties, () => {
			setPageTargeting(featureConfig);
		}).registerAd({
			params: adConfig,
			publisherIds,
			debug,
		});
	}, [adConfig, debug, featureConfig, siteProperties]);

	useEffect(() => {
		if (!isAdmin) registerAd();
	}, [registerAd, isAdmin]);

	// hmm: setting a classname dynamically here
	return !isAdmin ? <div id={id} className={`arcad ad-${adClass}`} /> : null;
};

AdUnit.propTypes = {
	adConfig: PropTypes.shape({
		id: PropTypes.string.isRequired,
		slotName: PropTypes.string.isRequired,
		adType: PropTypes.string.isRequired,
		adClass: PropTypes.string.isRequired,
		dimensions: PropTypes.array.isRequired,
		sizemap: PropTypes.object.isRequired,
		display: PropTypes.string.isRequired,
	}).isRequired,
	featureConfig: PropTypes.shape({
		siteProperties: PropTypes.shape({
			dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}).isRequired,
	}),
};

export default AdUnit;
