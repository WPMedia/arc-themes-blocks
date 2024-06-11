import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import {
	Conditional,
	formatSocialURL,
	getFocalFromANS,
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

const AuthorBioItemsContainer = () => {
	const { globalContent: content } = useFusionContext();

	return <AuthorBioItems content={content} />;
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

export const AuthorBioItems = ({ content }) => {
	const phrases = usePhrases();
	const { credits = {} } = content;
	const { by = [] } = credits;

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
	const { isAdmin } = useFusionContext();

	if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields?.lazyLoad && !isAdmin}>
			<AuthorBioItemsContainer />
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
	}),
};

export default AuthorBio;
