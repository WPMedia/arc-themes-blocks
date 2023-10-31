import React from "react";
import { isServerSide } from "@wpmedia/engine-theme-sdk";
import PropTypes from "@arc-fusion/prop-types";

import { useFusionContext } from "fusion:context";

// import PaywallOffer from "../../components/PaywallOffer";
// import RegwallOffer from "../../components/RegwallOffer";
import usePaywall from "../../components/usePaywall";

const Paywall = ({ customFields }) => {
	const { isAdmin } = useFusionContext();

	const {
		adminViewState,
		displayMode,
		linkText,
		linkUrl,
		payActionText,
		payActionUrl,
		payLinkPrompt,
		payReasonPrompt,
		registerActionText,
		registerActionUrl,
		registerHeaderText,
		registerLinkPrompt,
		registerReasonPrompt,
		registerSubHeaderText,
	} = customFields;

	const { isPaywalled, isRegisterwalled } = usePaywall();

	if (!isServerSide()) {
		if ((!isAdmin && isRegisterwalled) || (isAdmin && adminViewState === "showRegwall")) {
			return null;
			// <RegwallOffer
			// 	actionText={registerActionText}
			// 	actionUrl={registerActionUrl}
			// 	displayMode={displayMode}
			// 	headlineText={registerHeaderText}
			// 	linkPrompt={registerLinkPrompt}
			// 	linkText={linkText}
			// 	linkUrl={linkUrl}
			// 	reasonPrompt={registerReasonPrompt}
			// 	subheadlineText={registerSubHeaderText}
			// />
		}
		if ((!isAdmin && isPaywalled) || (isAdmin && adminViewState === "showPaywall")) {
			return null;
			// <PaywallOffer
			// 	actionText={payActionText}
			// 	actionUrl={payActionUrl}
			// 	displayMode={displayMode}
			// 	linkPrompt={payLinkPrompt}
			// 	linkText={linkText}
			// 	linkUrl={linkUrl}
			// 	reasonPrompt={payReasonPrompt}
			// />
		}
	}
	return null;
};

Paywall.icon = "tag-dollar";

Paywall.label = "Paywall - Arc Block";

Paywall.propTypes = {
	customFields: PropTypes.shape({
		adminViewState: PropTypes.oneOf(["hide", "showRegwall", "showPaywall"]).tag({
			defaultValue: "hide",
			description: "Determines which view is shown here in the admin screen. ",
			label: "Preview",
			labels: {
				hide: "Hide",
				showRegwall: "Show Registration Wall",
				showPaywall: "Show Payment Wall",
			},
		}),
		displayMode: PropTypes.oneOf(["bottomHalf", "full", "modal"]).tag({
			defaultValue: "bottomHalf",
			description: "Determines how the dialog will present itself to the user when required.",
			hidden: true,
			label: "Paywall Display Mode",
			labels: {
				bottomHalf: "Show as bottom half of screen",
				full: "Show as a full page cover",
				modal: "Show as a modal dialog",
			},
		}),
		linkText: PropTypes.string.tag({
			label: "Log In link text",
			defaultValue: "Log In.",
		}),
		linkUrl: PropTypes.string.tag({
			label: "Log In link URL",
			defaultValue: "/account/login/",
		}),

		payActionText: PropTypes.string.tag({
			group: "Payment Wall",
			label: "CTA button text",
			defaultValue: "Subscribe",
		}),
		payActionUrl: PropTypes.string.tag({
			group: "Payment Wall",
			label: "CTA button URL",
			defaultValue: "/offer/",
		}),
		payReasonPrompt: PropTypes.string.tag({
			group: "Payment Wall",
			label: "Reason prompt text",
			defaultValue: "Subscribe to continue reading.",
		}),

		registerActionText: PropTypes.string.tag({
			group: "Registration Wall",
			label: "CTA button text",
			defaultValue: "",
		}),
		registerActionUrl: PropTypes.string.tag({
			group: "Registration Wall",
			label: "CTA button URL",
			defaultValue: "/account/signup/",
		}),
		registerHeaderText: PropTypes.string.tag({
			group: "Registration Wall",
			label: "Header Text",
			defaultValue: "",
		}),
		registerSubHeaderText: PropTypes.string.tag({
			group: "Registration Wall",
			label: "Subheader Text",
			defaultValue: "",
		}),
		registerReasonPrompt: PropTypes.string.tag({
			group: "Registration Wall",
			label: "Reason prompt text",
			defaultValue: "Register to continue reading.",
		}),
	}),
};

export default Paywall;
