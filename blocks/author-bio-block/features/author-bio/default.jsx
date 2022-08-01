import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import getTranslatedPhrases from "fusion:intl";
import styled from "styled-components";
import { LinkSVGHover } from "@wpmedia/news-theme-css/js/styled/linkHovers";
import { LazyLoad, constructSocialURL } from "@wpmedia/engine-theme-sdk";
import { PrimaryFont } from "@wpmedia/shared-styles";
import { Icon, Image, isServerSide } from "@wpmedia/arc-themes-components";
import getProperties from "fusion:properties";

const MediaLinksStyled = styled(LinkSVGHover)``;

const renderAuthorInfo = (author, arcSite) => {
	const { image = {}, name, resized_params: resizedImageOptions } = author;

	const { url = "", alt_text: altText = "" } = image;

	return url ? (
		<Image
			url={url}
			alt={altText || name}
			smallWidth={84}
			smallHeight={0}
			mediumWidth={84}
			mediumHeight={0}
			largeWidth={84}
			largeHeight={0}
			breakpoints={getProperties(arcSite)?.breakpoints}
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
		if (
			author.description &&
			author.description.length > 0 &&
			original &&
			original.bio &&
			original.bio.length > 0
		) {
			// A loop to generate the list of social media links.
			// If no url is provided, then the social link will be skipped.
			const socialLinks =
				author.social_links && author.social_links.length > 0
					? author.social_links.reduce((result, socialLink) => {
							if (socialLink.site && socialLink.url && socialLink.url.length > 0) {
								let socialButton;
								const constructedURL = constructSocialURL(socialLink.site, socialLink.url);

								const MediaLink = ({ children, webService, ...otherProps }) => (
									<MediaLinksStyled
										href={constructedURL}
										target="_blank"
										rel="noreferrer noopener"
										aria-label={
											webService
												? phrases.t(`author-bio-block.social-${webService.toLowerCase()}`, {
														authorName: name,
												  })
												: null
										}
										primaryColor={PrimaryColor}
										{...otherProps}
									>
										{children}
									</MediaLinksStyled>
								);

								switch (socialLink.site) {
									case "linkedin":
										socialButton = (
											<MediaLink webService="linkedin">
												<Icon name="LinkedIn" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "twitter":
										socialButton = (
											<MediaLink webService="twitter">
												<Icon name="Twitter" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "instagram":
										socialButton = (
											<MediaLink webService="instagram">
												<Icon name="Instagram" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "facebook":
										socialButton = (
											<MediaLink webService="facebook">
												<Icon name="Facebook" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "reddit":
										socialButton = (
											<MediaLink webService="reddit">
												<Icon name="Reddit" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "youtube":
										socialButton = (
											<MediaLink webService="youtube" id="link-social-youtube">
												<Icon name="Youtube" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "medium":
										socialButton = (
											<MediaLink webService="medium">
												<Icon name="Medium" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "tumblr":
										socialButton = (
											<MediaLink webService="tumblr">
												<Icon name="Tumblr" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "pinterest":
										socialButton = (
											<MediaLink webService="pinterest">
												<Icon name="Pinterest" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "snapchat":
										socialButton = (
											<MediaLink webService="snapchat">
												<Icon name="Snapchat" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "whatsapp":
										socialButton = (
											<MediaLink webService="whatsapp">
												<Icon name="WhatsApp" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "soundcloud":
										socialButton = (
											<MediaLink webService="soundcloud">
												<Icon name="SoundCloud" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									case "rss":
										socialButton = (
											<MediaLink webService="rss">
												<Icon name="Rss" fill={PrimaryColor} />
											</MediaLink>
										);
										break;
									default:
										socialButton = (
											<MediaLink webService="email">
												<Icon name="Envelope" fill={PrimaryColor} />
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
			const authorName = original.byline ? (
				<PrimaryFont as="h2" className="authorName" fontColor="primary-color">
					{original.byline}
				</PrimaryFont>
			) : undefined;
			const authorNameWithHyperlink = author.url ? (
				<a href={author.url}>{authorName}</a>
			) : undefined;

			authorList.push(
				<section key={author.name ? author.name : ""} className="authors">
					<section className="author">
						{renderAuthorInfo(author, arcSite)}
						<section className="descriptions">
							{authorNameWithHyperlink || authorName}
							{/* there will always be a description via conditional on 52 */}
							<p>{author.description}</p>
							<section className="socialButtons">{socialLinks}</section>
						</section>
					</section>
				</section>
			);
		}

		return authorList;
	}, []);

	if (authors.length === 0) {
		return null;
	}

	return (
		<PrimaryFont as="section" className="author-bio">
			{authors}
		</PrimaryFont>
	);
};

const AuthorBio = ({ customFields = {} }) => {
	const { isAdmin } = useFusionContext();
	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
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
