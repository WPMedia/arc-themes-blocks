import React, { useEffect, useCallback } from "react";
import PropTypes from "@arc-fusion/prop-types";
import ArcAdsInstance from "../ArcAdsInstance";
import { setPageTargeting } from "../../ad-helper";

const AdUnit = (props) => {
	const { adConfig, featureConfig } = props;
	const { id } = adConfig;
	const {
		customFields: { debug },
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
		registerAd();
	}, [registerAd]);

	return <div id={id} />;
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
