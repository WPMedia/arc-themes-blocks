import React from "react";

import {
	Conditional,
	formatSocialURL,
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

const Presentation = ({ author = {}, authorProfileLink }) => {
	const phrases = usePhrases();
	const supportedSocials = Object.keys(socialIcons);
	const socials = Object.entries(author)
		.filter(([key, value]) => supportedSocials.includes(key) && value)
		.map(([key]) => key);

	const bio = author?.longBio || author?.bio;

	return author?.byline || author?.image || author?.role || bio || socials.length ? (
		<div className={BLOCK_CLASS_NAME}>
			{author?.image ? (
				<MediaItem>
					<Image src={author.image} alt={author.byline || ""} />
				</MediaItem>
			) : null}
			{author?.byline || author?.role || bio || socials.length ? (
				<HeadingSection>
					<Stack className={`${BLOCK_CLASS_NAME}__text`}>
						{author?.byline || author?.role ? (
							<Stack className={`${BLOCK_CLASS_NAME}__identification`}>
								{author.byline ? (
									<Conditional
										className={`${BLOCK_CLASS_NAME}__name-link`}
										condition={authorProfileLink}
										component={Link}
										href={authorProfileLink}
									>
										<Heading className={`${BLOCK_CLASS_NAME}__name`}>{author.byline}</Heading>
									</Conditional>
								) : null}
								{author.role ? (
									<HeadingSection>
										<Heading className={`${BLOCK_CLASS_NAME}__role`}>{author.role}</Heading>
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
											href={formatSocialURL(item, author[item])}
											key={item}
											openInNewTab
											title={phrases.t(`global.social-${item.toLowerCase()}-contact`, {
												authorName: author.name,
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
