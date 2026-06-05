import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import RecommendationCarousel from "./_children/RecommendationCarousel";
import fetchRecommendations from "./_children/fetchRecommendations";

const BLOCK_CLASS_NAME = "b-fy-recommendations";

const getUserId = () => {
	try {
		const match = document.cookie.match(/(?:^|;\s*)fy_user_id=([^;]+)/);
		if (match) return decodeURIComponent(match[1]);
		return localStorage.getItem("fy_user_id") || null;
	} catch (e) {
		return null;
	}
};

const getDeviceType = () => {
	const ua = navigator.userAgent;
	if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
	if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return "mobile";
	return "desktop";
};

function FYRecommendations({ customFields = {} }) {
	const { displayAmount = 5, lazyLoad = true } = customFields;
	const { globalContent, arcSite } = useFusionContext();
	const [items, setItems] = useState(null);
	const [fetched, setFetched] = useState(false);
	const sentinelRef = useRef(null);
	// Response-level attribution (exposure_id, …) is captured here so it can be
	// round-tripped to the collector on exposure/click events later. Not wired yet.
	const attributionRef = useRef(null);

	const loadRecommendations = useCallback(() => {
		const userId = getUserId();
		const query = {
			num_results: displayAmount,
			device_type: getDeviceType(),
		};
		if (userId) query.user_id = userId;
		if (globalContent?._id) query.item_id = globalContent._id;

		fetchRecommendations({ site: arcSite, query })
			.then(({ content_elements: elements, attribution }) => {
				attributionRef.current = attribution;
				if (Array.isArray(elements) && elements.length > 0) {
					setItems(elements);
				}
			})
			.finally(() => setFetched(true));
	}, [arcSite, displayAmount, globalContent]);

	useEffect(() => {
		// Never fetch on the server; only after mount in the browser.
		if (!lazyLoad) {
			loadRecommendations();
			return undefined;
		}

		const el = sentinelRef.current;
		if (!el || typeof IntersectionObserver === "undefined") {
			loadRecommendations();
			return undefined;
		}

		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				observer.disconnect();
				loadRecommendations();
			}
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [lazyLoad, loadRecommendations]);

	if (items) {
		return (
			<div className={BLOCK_CLASS_NAME}>
				<RecommendationCarousel items={items} />
			</div>
		);
	}

	// After a completed fetch with no usable results (empty/error): render nothing.
	if (fetched) return null;

	// Before the fetch fires: a lightweight, content-less placeholder so lazy-load
	// has an element to observe. SSR emits this (no content), not a finished grid.
	return (
		<div ref={sentinelRef} className={`${BLOCK_CLASS_NAME}__placeholder`} aria-hidden="true" />
	);
}

FYRecommendations.label = "FY Recommendations – Arc Block";

// find matching icon in https://redirector.arcpublishing.com/pagebuilder/block-icon-library
FYRecommendations.icon = "ui-browser-slider";

FYRecommendations.propTypes = {
	customFields: PropTypes.shape({
		displayAmount: PropTypes.number.tag({
			label: "Number of recommendations",
			description: "Max items to display (default: 5)",
			defaultValue: 5,
			group: "Configure Content",
		}),
		lazyLoad: PropTypes.bool.tag({
			label: "Lazy load",
			description: "Fetch recommendations when the block scrolls into view",
			defaultValue: true,
			group: "Configure Content",
		}),
	}),
};

export default FYRecommendations;
