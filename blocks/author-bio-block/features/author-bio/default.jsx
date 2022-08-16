import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import getTranslatedPhrases from "fusion:intl";
import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	formatSocialURL,
	Icon,
	Image,
	isServerSide,
	Stack,
	Paragraph,
	Link,
} from "@wpmedia/arc-themes-components";
import getProperties from "fusion:properties";

const BLOCK_CLASS_NAME = "b-author-bio";

const renderAuthorImage = (author, arcSite) => {
	const { image = {}, name, resized_params: resizedImageOptions } = author;

	const { url = "", alt_text: altText = "" } = image;

	return url ? (
		<Image
			src={url}
			alt={altText || name}
			resizerURL={getProperties(arcSite)?.resizerURL}
			resizedImageOptions={resizedImageOptions}
		/>
	) : null;
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
	const PrimaryColor = getThemeStyle(arcSite)["primary-color"];

	// Generate a list of author components
	const authors = by.reduce((authorList, author) => {
		const { additional_properties: additionalProperties, name } = author;
		const { original } = additionalProperties;

		// If the author doesn't have a description, then do not add them to the list
		// Also check for their bio, which means that they are a staff
		if (author?.description?.length > 0 && original?.bio?.length > 0) {
			// A loop to generate the list of social media links.
			// If no url is provided, then the social link will be skipped.
			const socialLinks =
				author?.social_links?.length > 0
					? author.social_links.reduce((result, socialLink) => {
							if (socialLink?.site && socialLink?.url?.length > 0) {
								let socialButton;
								const constructedURL = formatSocialURL(socialLink.site, socialLink.url);

								const MediaLink = ({ children, webService, ...otherProps }) => (
									<Link
										href={constructedURL}
										target="_blank"
										rel="noreferrer noopener"
										aria-label={
											webService
												? phrases.t(`global.social-${webService.toLowerCase()}-content`, {
														authorName: name,
												  })
												: null
										}
										primaryColor={PrimaryColor}
										{...otherProps}
									>
										{children}
									</Link>
								);

								switch (socialLink.site) {
									case "linkedin":
										socialButton = (
											<MediaLink webService="linkedin">
												<Icon name="LinkedIn" />
											</MediaLink>
										);
										break;
									case "twitter":
										socialButton = (
											<MediaLink webService="twitter">
												<Icon name="Twitter" />
											</MediaLink>
										);
										break;
									case "instagram":
										socialButton = (
											<MediaLink webService="instagram">
												<Icon name="Instagram" />
											</MediaLink>
										);
										break;
									case "facebook":
										socialButton = (
											<MediaLink webService="facebook">
												<Icon name="Facebook" />
											</MediaLink>
										);
										break;
									case "reddit":
										socialButton = (
											<MediaLink webService="reddit">
												<Icon name="Reddit" />
											</MediaLink>
										);
										break;
									case "youtube":
										socialButton = (
											<MediaLink webService="youtube" id="link-social-youtube">
												<Icon name="Youtube" />
											</MediaLink>
										);
										break;
									case "medium":
										socialButton = (
											<MediaLink webService="medium">
												<Icon name="Medium" />
											</MediaLink>
										);
										break;
									case "tumblr":
										socialButton = (
											<MediaLink webService="tumblr">
												<Icon name="Tumblr" />
											</MediaLink>
										);
										break;
									case "pinterest":
										socialButton = (
											<MediaLink webService="pinterest">
												<Icon name="Pinterest" />
											</MediaLink>
										);
										break;
									case "snapchat":
										socialButton = (
											<MediaLink webService="snapchat">
												<Icon name="Snapchat" />
											</MediaLink>
										);
										break;
									case "whatsapp":
										socialButton = (
											<MediaLink webService="whatsapp">
												<Icon name="WhatsApp" />
											</MediaLink>
										);
										break;
									case "soundcloud":
										socialButton = (
											<MediaLink webService="soundcloud">
												<Icon name="SoundCloud" />
											</MediaLink>
										);
										break;
									case "rss":
										socialButton = (
											<MediaLink webService="rss">
												<Icon name="Rss" />
											</MediaLink>
										);
										break;
									default:
										socialButton = (
											<MediaLink webService="email">
												<Icon name="Envelope" />
											</MediaLink>
										);
										break;
								}
								result.push(<Fragment key={socialLink.site}>{socialButton}</Fragment>);
							}
							return result;
					  }, [])
					: null;

			// Make the name a hyperlink if a url to the bio page is provided
			const authorName = original?.byline ? (
				<Paragraph className={`${BLOCK_CLASS_NAME}__authorName`} data-testid="author-name">
					{original.byline}
				</Paragraph>
			) : undefined;
			const authorNameWithHyperlink = author?.url ? (
				<a data-testid="author-name" href={author?.url}>
					{authorName}
				</a>
			) : undefined;

			authorList.push(
				<section key={author?.name ? author.name : ""}>
					<div className={`${BLOCK_CLASS_NAME}__author`}>
						{renderAuthorImage(author, arcSite)}
						<Stack data-testid="descriptions">
							{authorNameWithHyperlink || authorName}
							{/* there will always be a description via conditional on 52 */}
							<Paragraph className={`${BLOCK_CLASS_NAME}__authorDescription`}>
								{author?.description}
							</Paragraph>
							<div className={`${BLOCK_CLASS_NAME}__socialButtons`}>{socialLinks}</div>
						</Stack>
					</div>
				</section>
			);
		}

		return authorList;
	}, []);
	if (authors.length === 0) {
		return null;
	}
	return <div data-testid="authors">{authors}</div>;
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
