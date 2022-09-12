import React from "react";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import PropTypes from "@arc-fusion/prop-types";
import { isServerSide } from "@wpmedia/arc-themes-components";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";

import Presentation from "./_children/Presentation";

const FullAuthorBio = ({ customFields = {} }) => {
	const { arcSite, globalContent, isAdmin } = useFusionContext();

	const isLazyLoad = customFields.lazyLoad && !isAdmin;
	if (isLazyLoad && isServerSide()) {
		return null;
	}

	const { locale } = getProperties(arcSite);
	const currentAuthor =
		globalContent?.authors?.[0] || globalContent?.credits?.by?.[0]?.additional_properties?.original;

	const linkAuthorProfile =
		!globalContent?.authors?.[0] &&
		globalContent?.credits?.by?.[0]?.additional_properties?.original;

	return currentAuthor ? (
		<LazyLoad enabled={isLazyLoad}>
			<Presentation author={currentAuthor} linkAuthorProfile={linkAuthorProfile} locale={locale} />
		</LazyLoad>
	) : null;
};

FullAuthorBio.label = "Full Author Bio – Arc Block";

FullAuthorBio.icon = "paragraph-image-right";

FullAuthorBio.propTypes = {
	customFields: PropTypes.shape({
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

export default FullAuthorBio;
