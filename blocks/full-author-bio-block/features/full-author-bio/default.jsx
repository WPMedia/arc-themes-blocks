import React from "react";

import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";

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

	const rawAnsImage = firstTruthyValue(
		globalContent?.authors?.[0]?.ansImage,
		globalContent?.credits?.by?.[0]?.ansImage,
		globalContent?.credits?.by?.[0]?.additional_properties?.ansImage,
		globalContent?.authors?.[0]?.image,
		globalContent?.credits?.by?.[0]?.image,
		globalContent?.credits?.by?.[0]?.additional_properties?.image,
	);

	const rawImageUrl = firstTruthyValue(
		globalContent?.authors?.[0]?.image?.url,
		globalContent?.credits?.by?.[0]?.additional_properties?.original?.image,
		globalContent?.credits?.by?.[0]?.additional_properties?.original?.ansImage?.url,
		globalContent?.authors?.[0]?.ansImage?.url,
	);

	const imageAuth = rawAnsImage?.auth

	let resizedAuth = useContent(
		imageAuth
			? {}
			: {
				source: "signing-service",
				query: { id: rawImageUrl },
			}
	) || {};

	if (imageAuth) {
		resizedAuth = imageAuth;
	}

	let updatedAuthorImage = rawAnsImage;

	if (resizedAuth?.hash) {
		updatedAuthorImage = {
			...rawAnsImage,
			auth: { [RESIZER_TOKEN_VERSION]: resizedAuth.hash }
		};
	} else if (Object.keys(resizedAuth).length > 0) {
		const rawOriginalAnsImage = globalContent?.credits?.by?.[0]?.additional_properties?.original?.ansImage;
		if (rawAnsImage?.auth && rawAnsImage?.url) {
			updatedAuthorImage = {
				...rawAnsImage,
				url: rawImageUrl,
				auth: resizedAuth,
			};
		} else if (rawOriginalAnsImage?.auth && rawOriginalAnsImage?.url) {
			updatedAuthorImage = {
				...rawOriginalAnsImage,
				url: rawImageUrl,
				auth: resizedAuth,
			};
		}
	}

	return currentAuthor ? (
		<LazyLoad enabled={isLazyLoad}>
			<Presentation
				author={{ ...currentAuthor, image: updatedAuthorImage }}
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


