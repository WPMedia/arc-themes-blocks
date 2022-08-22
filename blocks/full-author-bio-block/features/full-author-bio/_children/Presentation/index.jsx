import React from "react";

import getTranslatedPhrases from "fusion:intl";

import {
	formatSocialURL,
	Heading,
	HeadingSection,
	Icon,
	Image,
	Link,
	MediaItem,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const socialIcons = {
	email: <Icon name="Envelope" />,
	facebook: <Icon name="Facebook" />,
	instagram: <Icon name="Instagram" />,
	linkedin: <Icon name="LinkedIn" />,
	medium: <Icon name="Medium" />,
	pinterest: <Icon name="Pinterest" />,
	reddit: <Icon name="Reddit" />,
	rss: <Icon name="Rss" />,
	snapchat: <Icon name="Snapchat" />,
	soundcloud: <Icon name="SoundCloud" />,
	tumblr: <Icon name="Tumblr" />,
	twitter: <Icon name="Twitter" />,
	whatsapp: <Icon name="WhatsApp" />,
	youtube: <Icon name="Youtube" />,
};

const BLOCK_CLASS_NAME = "b-full-author-bio";

const Presentation = ({ author = {}, locale }) => {
	const phrases = getTranslatedPhrases(locale);
	const supportedSocials = Object.keys(socialIcons);
	const socials = Object.entries(author)
		.filter(([key, value]) => supportedSocials.includes(key) && value)
		.map(([key]) => key);

	const bio = author?.bio || author?.longBio;

	return author?.byline || author?.image || author?.role || bio || socials.length ? (
		<Stack className={BLOCK_CLASS_NAME}>
			{author?.image ? (
				<MediaItem>
					<Image src={author.image} alt={author.byline || ""} />
				</MediaItem>
			) : null}
			{author?.byline || author?.role ? (
				<HeadingSection>
					<Stack className={`${BLOCK_CLASS_NAME}__identification`}>
						{author.byline ? (
							<Heading className={`${BLOCK_CLASS_NAME}__name`}>{author.byline}</Heading>
						) : null}
						{author.role ? (
							<HeadingSection>
								<Heading className={`${BLOCK_CLASS_NAME}__role`}>{author.role}</Heading>
							</HeadingSection>
						) : null}
					</Stack>
				</HeadingSection>
			) : null}
			{bio ? <Paragraph>{bio}</Paragraph> : null}
			{socials.length ? (
				<Stack className={`${BLOCK_CLASS_NAME}__social`} direction="horizontal" wrap="wrap">
					{socials.map((item) => (
						<Link
							className={`${BLOCK_CLASS_NAME}__social-link`}
							href={formatSocialURL(item, author[item])}
							key={item}
							openInNewTab
							title={phrases.t(`global.social-${item.toLowerCase()}-content`, {
								authorName: author.name,
							})}
						>
							{socialIcons[item]}
						</Link>
					))}
				</Stack>
			) : null}
			<div />
		</Stack>
	) : null;
};

export default Presentation;
