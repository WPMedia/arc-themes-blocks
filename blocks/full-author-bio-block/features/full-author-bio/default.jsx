import React from "react";

import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";

import PropTypes from "@arc-fusion/prop-types";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";

import Presentation from "./_children/Presentation";

const FullAuthorBio = ({ customFields = {} }) => {
	const { arcSite, globalContent, isAdmin } = useFusionContext();

	const isLazyLoad = customFields.lazyLoad && !isAdmin;
	if (isLazyLoad && isServerSide()) {
		return null;
	}

	const { locale = "en" } = getProperties(arcSite);
	const currentAuthor = globalContent?.authors?.[0];

	return currentAuthor ? (
		<LazyLoad enabled={isLazyLoad}>
			<Presentation author={currentAuthor} locale={locale} />
		</LazyLoad>
	) : null;
};

FullAuthorBio.label = "FullAuthorBio – Arc Block";

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
