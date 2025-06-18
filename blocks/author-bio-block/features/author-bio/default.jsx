import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import {
	Conditional,
	formatSocialURL,
	getFocalFromANS,
	getManualImageID,
	Heading,
	HeadingSection,
	Icon,
	Image,
	isServerSide,
	LazyLoad,
	Link,
	Paragraph,
	Stack,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-author-bio";

const siteMap = {
	email: "Envelope",
	facebook: "Facebook",
	instagram: "Instagram",
	linkedin: "LinkedIn",
	medium: "Medium",
	pinterest: "Pinterest",
	reddit: "Reddit",
	rss: "Rss",
	snapchat: "Snapchat",
	soundcloud: "SoundCloud",
	tumblr: "Tumblr",
	twitter: "Twitter",
	whatsapp: "WhatsApp",
	youtube: "Youtube",
};

const AuthorBioItemsContainer = (ansImage) => {
	const { globalContent: content } = useFusionContext();
	return <AuthorBioItems content={content} alteredAnsImage={ansImage} />;
};

const AuthorImage = ({ ansImage, altText }) => {
	if (ansImage?.auth) {
		return (
			<Image
				alt={altText}
				ansImage={ansImage}
				aspectRatio="1:1"
				resizedOptions={getFocalFromANS(ansImage)}
				responsiveImages={[100, 200, 400]}
				width={100}
			/>
		);
	}
	if (ansImage?.url) {
		return <Image alt={altText} src={ansImage.url} width={100} />;
	}
	return null;
};

export const AuthorBioItems = ({ content, alteredAnsImage }) => {
	const phrases = usePhrases();
	const { credits = {} } = content;
	const { by = [] } = credits;
	console.log('--------------------------------');
	console.log(JSON.stringify(by, null, 2));

	const authors = by
		.filter(
			({ additional_properties: additionalProperties = {}, description = "" }) =>
				description?.length && additionalProperties?.original?.bio?.length,
		)
		.map(
			({
				additional_properties: {
					original: { byline },
				},
				description,
				name,
				image: { alt_text: altText = "", ...ansImage } = {},
				social_links: socialLinks = [],
				url: authorUrl,
			}) => (
				<Stack
					direction="horizontal"
					className={`${BLOCK_CLASS_NAME}__author`}
					key={`${name}_${authorUrl}`}
				>
					<AuthorImage ansImage={ansImage} altText={altText || name || ""} />
					<Stack>
						{byline ? (
							<Conditional
								className={`${BLOCK_CLASS_NAME}__author-name-link`}
								condition={authorUrl}
								component={Link}
								href={authorUrl}
							>
								<HeadingSection>
									<Heading className={`${BLOCK_CLASS_NAME}__author-name`}>{byline}</Heading>
								</HeadingSection>
							</Conditional>
						) : null}
						<Paragraph className={`${BLOCK_CLASS_NAME}__author-description`}>
							{description}
						</Paragraph>
						{socialLinks?.length ? (
							<Stack
								direction="horizontal"
								wrap="wrap"
								className={`${BLOCK_CLASS_NAME}__social-link-wrapper`}
							>
								{socialLinks
									.filter(({ site, url }) => site && url?.length)
									.map(({ site, url }) => (
										<Link
											aria-label={phrases.t(`global.social-${site.toLowerCase()}-connect`, {
												authorName: name,
											})}
											className={`${BLOCK_CLASS_NAME}__social-link`}
											href={formatSocialURL(site, url)}
											id={site === "youtube" ? "link-social-youtube" : undefined}
											key={site}
											openInNewTab
										>
											<Icon name={siteMap[site] || "Envelope"} />
										</Link>
									))}
							</Stack>
						) : null}
					</Stack>
				</Stack>
			),
		);

	return authors.length ? <Stack className={BLOCK_CLASS_NAME}>{authors}</Stack> : null;
};

const AuthorBio = ({ customFields = {} }) => {
	const {
		lazyLoad,
		imageAuth,
		imageURL,
		imageId,
		imageFocalPoint,
	} = customFields;
	const { isAdmin } = useFusionContext();
	
	console.log('imageAuth', imageAuth);
	console.log('imageURL', imageURL);
	console.log('imageId', imageId);
	console.log('imageFocalPoint', imageFocalPoint);

	const resizedImage = imageId && imageAuth && imageAuth !== "{}" && imageURL?.includes(imageId);
	console.log('resizedImage', resizedImage)
	const manualImageId = getManualImageID(imageURL, resizedImage);

	let resizedAuth = useContent(
		resizedImage || !imageURL
			? {}
			: {
				source: "signing-service",
				query: { id: manualImageId || imageURL },
			},
	);
	if (imageAuth && !resizedAuth) {
		resizedAuth = JSON.parse(imageAuth);
	}
	if (resizedAuth?.hash && !resizedAuth[RESIZER_TOKEN_VERSION]) {
		resizedAuth[RESIZER_TOKEN_VERSION] = resizedAuth.hash;
	}
	console.log('resizedAuth', resizedAuth)

	if (lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}

	const ansImage = {
		_id: resizedImage ? imageId : manualImageId,
		url: imageURL,
		auth: resizedAuth,
		focal_point: imageFocalPoint ? JSON.parse(imageFocalPoint) : undefined,
	};

	return (
		<LazyLoad enabled={lazyLoad && !isAdmin}>
			<AuthorBioItemsContainer ansImage={ansImage}/>
		</LazyLoad>
	);
};

AuthorBio.label = "Short Author Bio – Arc Block";

AuthorBio.icon = "paragraph-normal";

AuthorBio.propTypes = {
	customFields: PropTypes.shape({
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
		imageURL: PropTypes.string.tag({
			label: "Image URL",
			group: "Configure Content",
			searchable: "image",
		}),
		imageAuth: PropTypes.string.tag({
			hidden: true,
		}),
		imageId: PropTypes.string.tag({
			hidden: true,
		}),
		imageFocalPoint: PropTypes.string.tag({
			hidden: true,
		}),
	}),
};

export default AuthorBio;
