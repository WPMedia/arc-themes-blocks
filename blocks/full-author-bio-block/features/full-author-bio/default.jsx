import React from "react";

import { useFusionContext } from "fusion:context";

import PropTypes from "@arc-fusion/prop-types";
import { isServerSide, LazyLoad } from "@wpmedia/arc-themes-components";

import Presentation from "./_children/Presentation";

const firstTruthyValue = (...objects) => objects.find((value) => value || null);

const FullAuthorBio = ({ customFields = {} }) => {
	const { globalContent, isAdmin } = useFusionContext();

	const isLazyLoad = customFields.lazyLoad && !isAdmin;
	if (isLazyLoad && isServerSide()) {
		return null;
	}

	const currentAuthor = firstTruthyValue(
		globalContent?.authors?.[0],
		globalContent?.credits?.by?.[0]?.additional_properties?.original,
	);

	const authorProfileLink =
		currentAuthor === globalContent?.credits?.by?.[0]?.additional_properties?.original
			? globalContent?.credits?.by?.[0]?.url
			: null;

	const authorImage = firstTruthyValue(
		globalContent?.authors?.[0]?.ansImage,
		globalContent?.credits?.by?.[0]?.ansImage,
		globalContent?.credits?.by?.[0]?.additional_properties?.ansImage,
		globalContent?.authors?.[0]?.image,
		globalContent?.credits?.by?.[0]?.image,
		globalContent?.credits?.by?.[0]?.additional_properties?.image,
	);

	return currentAuthor ? (
		<LazyLoad enabled={isLazyLoad}>
			<Presentation
				author={{ ...currentAuthor, image: authorImage }}
				authorProfileLink={authorProfileLink}
			/>
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
