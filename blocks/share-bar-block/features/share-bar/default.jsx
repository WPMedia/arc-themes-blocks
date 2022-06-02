import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Button, Icon, Stack } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

const BLOCK_CLASS_NAME = "b-share-bar";

function encodeSocialUrl(websiteDomain, websiteUrl, encodedTitle, social) {
	const encodedUrl = encodeURI(`${websiteDomain}${websiteUrl}`);

	switch (social) {
		case "facebook":
			return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}`;
		case "twitter":
			return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
		case "pinterest":
			return `http://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
		case "linkedIn":
			return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
		default:
			return encodedUrl;
	}
}

const share = {
	facebook: (url) => {
		const windowFeatures = "width=658, height=354, scrollbars=no";
		window.open(url, "share_facebook", windowFeatures);
	},
	twitter: (url) => {
		const windowFeatures = "width=658, height=354, scrollbars=no";
		window.open(url, "share_twitter", windowFeatures);
	},
	pinterest: (url) => {
		const windowFeatures = "width=658, height=354, scrollbars=no";
		window.open(url, "share_pinterest", windowFeatures);
	},
	linkedIn: (url) => {
		const windowFeatures = "width=830, height=460, scrollbars=no";
		window.open(url, "share_linkedin", windowFeatures);
	},
	email: (url, title, websiteName) => {
		const windowFeatures = "width=830, height=460, scrollbars=no";
		const mailUrl = `mailto:?subject=${title}-${websiteName}&body=${url}`;
		window.open(mailUrl, "send_email", windowFeatures);
	},
};

const getLogoComponent = {
	facebook: <Icon name="Facebook" className={`${BLOCK_CLASS_NAME}__facebook`} />,
	linkedIn: <Icon name="LinkedIn" className={`${BLOCK_CLASS_NAME}__linkedin`} />,
	pinterest: <Icon name="Pinterest" className={`${BLOCK_CLASS_NAME}__pinterest`} />,
	twitter: <Icon name="Twitter" className={`${BLOCK_CLASS_NAME}__twitter`} />,
	email: <Icon name="Envelope" className={`${BLOCK_CLASS_NAME}__email`} />,
};

const ShareBarContainer = () => {
	const {
		customFields,
		globalContent: {
			headlines: { basic: headlineString = "" },
			website_url: websiteUrl = "",
		},
		arcSite,
	} = useFusionContext();

	const { websiteDomain, websiteName, locale = "en" } = getProperties(arcSite);

	const phrases = getTranslatedPhrases(locale);

	return (
		<ShareBar
			customFields={customFields}
			websiteName={websiteName}
			websiteDomain={websiteDomain}
			websiteUrl={websiteUrl}
			headlineString={headlineString}
			phrases={phrases}
		/>
	);
};

export const ShareBar = ({
	customFields = {},
	websiteName,
	websiteDomain,
	websiteUrl,
	headlineString,
	phrases,
}) => {
	const shareButtons = [];
	Object.keys(customFields).forEach((social) => {
		if (customFields[social]) {
			const encodedTitle = encodeURIComponent(headlineString);
			const encodedUrl = encodeSocialUrl(websiteDomain, websiteUrl, encodedTitle, social);
			const socialType = phrases.t(`global.social-${social.toLowerCase()}`);

			shareButtons.push(
				<Button
					className={`${BLOCK_CLASS_NAME}__${social.toLowerCase()}`}
					key={social}
					accessibilityLabel={phrases.t("share-bar-block.share-button-aria-label", {
						socialType,
					})}
					onClick={() => share[social](encodedUrl, encodedTitle, websiteName)}
				>
					{getLogoComponent[social]}
				</Button>
			);
		}
	});

	if (!shareButtons.length) {
		return null;
	}

	return (
		<Stack
			className={BLOCK_CLASS_NAME}
			alignment="center"
			direction="vertical"
			justification="center"
		>
			{shareButtons}
		</Stack>
	);
};

ShareBarContainer.label = "Share Bar – Arc Block";

ShareBarContainer.icon = "share";

ShareBarContainer.propTypes = {
	customFields: PropTypes.shape({
		email: PropTypes.bool.tag({
			label: "Email",
			defaultValue: true,
		}),
		facebook: PropTypes.bool.tag({
			label: "Facebook",
			defaultValue: true,
		}),
		pinterest: PropTypes.bool.tag({
			label: "Pinterest",
			defaultValue: true,
		}),
		twitter: PropTypes.bool.tag({
			label: "Twitter",
			defaultValue: true,
		}),
		linkedIn: PropTypes.bool.tag({
			label: "LinkedIn",
			defaultValue: true,
		}),
	}),
};

export default ShareBarContainer;
