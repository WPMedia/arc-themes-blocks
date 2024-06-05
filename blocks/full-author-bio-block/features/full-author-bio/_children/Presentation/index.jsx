import React from "react";

import {
	Conditional,
	formatSocialURL,
	getFocalFromANS,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Link,
	MediaItem,
	Paragraph,
	Stack,
	usePhrases,
} from "@wpmedia/arc-themes-components";

const socialIcons = {
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

const BLOCK_CLASS_NAME = "b-full-author-bio";

const AuthorImage = ({ image, altText = "" }) => {
	if (image?.auth) {
		return (
			<MediaItem>
				<Image
					alt={altText}
					ansImage={image}
					aspectRatio="1:1"
					resizedOptions={getFocalFromANS(image)}
					responsiveImages={[180, 360, 720]}
					width={180}
				/>
			</MediaItem>
		);
	}
	if (typeof image === "string" && image !== "") {
		return (
			<MediaItem>
				<Image alt={altText} src={image} width={180} />
			</MediaItem>
		);
	}
	return null;
};

const Presentation = ({ author }) => {
	const phrases = usePhrases();

	const originalAuthor = author?.additional_properties?.original;
	const bio = originalAuthor?.longBio || originalAuthor?.bio;
	const authorImage = author?.ansImage || author?.image || originalAuthor?.image;

	const supportedSocials = Object.keys(socialIcons);
	const socials = Object.entries(originalAuthor || {})
		.filter(([key, value]) => supportedSocials.includes(key) && value)
		.map(([key]) => key);

	return originalAuthor?.byline || authorImage || originalAuthor?.role || bio || socials.length ? (
		<div className={BLOCK_CLASS_NAME}>
			<AuthorImage image={authorImage} altText={originalAuthor?.byline} />
			{originalAuthor?.byline || originalAuthor?.role || bio || socials.length ? (
				<HeadingSection>
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						{originalAuthor?.byline || originalAuthor?.role ? (
							<Stack className={`${BLOCK_CLASS_NAME}__identification`}>
								{originalAuthor.byline ? (
									<Conditional
										className={`${BLOCK_CLASS_NAME}__name-link`}
										condition={author?.url}
										component={Link}
										href={author?.url}
									>
										<Heading className={`${BLOCK_CLASS_NAME}__name`}>
											{originalAuthor.byline}
										</Heading>
									</Conditional>
								) : null}
								{originalAuthor.role ? (
									<HeadingSection>
										<Heading className={`${BLOCK_CLASS_NAME}__role`}>{originalAuthor.role}</Heading>
									</HeadingSection>
								) : null}
							</Stack>
						) : null}
						{bio ? <Paragraph>{bio}</Paragraph> : null}
						{socials.length ? (
							<Stack className={`${BLOCK_CLASS_NAME}__social`}>
								<HeadingSection>
									<Heading className={`${BLOCK_CLASS_NAME}__social-header`}>
										{phrases.t("full-author-bio-block.connect-text")}
									</Heading>
								</HeadingSection>
								<div className={`${BLOCK_CLASS_NAME}__social-icons`}>
									{socials.map((item) => (
										<Link
											className={`${BLOCK_CLASS_NAME}__social-link`}
											href={formatSocialURL(item, originalAuthor[item])}
											key={item}
											openInNewTab
											title={phrases.t(`global.social-${item.toLowerCase()}-connect`, {
												authorName: originalAuthor.name,
											})}
										>
											<Icon name={socialIcons[item]} />
										</Link>
									))}
								</div>
							</Stack>
						) : null}
						<div />
					</Stack>
				</HeadingSection>
			) : null}
		</div>
	) : null;
};

export default Presentation;
