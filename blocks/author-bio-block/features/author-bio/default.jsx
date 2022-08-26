import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	Conditional,
	formatSocialURL,
	Heading,
	HeadingSection,
	Icon,
	Image,
	isServerSide,
	Stack,
	Paragraph,
	Link,
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
	const { globalContent: content, arcSite } = useFusionContext();

	return <AuthorBioItems arcSite={arcSite} content={content} />;
};

export const AuthorBioItems = ({ arcSite, content }) => {
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	const { credits = {} } = content;
	const { by = [] } = credits;

	// Generate a list of author components
	const authors = by
		// If the author doesn't have a description, then do not add them to the list
		// Also check for their bio, which means that they are a staff
		.filter(
			({ additional_properties: additionalProperties = {}, description = "" }) =>
				description?.length && additionalProperties?.original?.bio?.length
		)
		// A loop to generate the list of social media links.
		// If no url is provided, then the social link will be skipped.
		.map(
			({
				additional_properties: { original: { byline } } = {},
				description,
				name,
				image: { url: imageUrl = "", alt_text: altText = "" } = {},
				social_links: socialLinks = [],
				url: authorUrl,
			}) => (
				<div className={`${BLOCK_CLASS_NAME}__author`} key={name}>
					{imageUrl ? <Image src={imageUrl} alt={altText || name} width={100} /> : null}
					<Stack>
						{byline || name ? (
							<Conditional
								className={`${BLOCK_CLASS_NAME}__author-name-link`}
								condition={authorUrl}
								component={Link}
								href={authorUrl}
							>
								<HeadingSection>
									<Heading className={`${BLOCK_CLASS_NAME}__author-name`}>{byline || name}</Heading>
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
											aria-label={phrases.t(`global.social-${site.toLowerCase()}-content`, {
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
				</div>
			)
		);

	return authors.length ? <Stack className={BLOCK_CLASS_NAME}>{authors}</Stack> : null;
};

const AuthorBio = ({ customFields = {} }) => {
	const { isAdmin } = useFusionContext();

	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
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
