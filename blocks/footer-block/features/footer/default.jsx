import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

import { LazyLoad } from "@wpmedia/engine-theme-sdk";
import {
	Grid,
	Heading,
	HeadingSection,
	isServerSide,
	Icon,
	Image,
	Link,
	MediaItem,
	Paragraph,
	Stack,
} from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-footer";

const FooterItem = ({ customFields: { navigationConfig } }) => {
	const { arcSite, deployment, contextPath } = useFusionContext();
	const {
		facebookPage,
		twitterUsername,
		rssUrl,
		copyrightText,
		lightBackgroundLogo,
		lightBackgroundLogoAlt,
		primaryLogo,
		primaryLogoAlt,
		locale,
	} = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	// Check if URL is absolute/base64
	let logoUrl = lightBackgroundLogo || primaryLogo;
	if (logoUrl && !(logoUrl.indexOf("http") === 0 || logoUrl.indexOf("base64") === 0))
		logoUrl = deployment(`${contextPath}/${logoUrl}`);

	const content = useContent({
		source: navigationConfig.contentService,
		query: {
			hierarchy: "footer",
			...navigationConfig.contentConfigValues,
			feature: "footer",
		},
		filter: `{
			children {
				_id
				node_type
				display_name
				name
				url
				children {
					_id
					node_type
					display_name
					name
					url
				}
			}
		}`,
	});

	return (
		<Stack className={BLOCK_CLASS_NAME}>
			<section className={`${BLOCK_CLASS_NAME}__top-container`}>
				{facebookPage || twitterUsername || rssUrl ? (
					<div className={`${BLOCK_CLASS_NAME}__social-links-container`}>
						<Stack className={`${BLOCK_CLASS_NAME}__social-links`} direction="horizontal">
							{facebookPage ? (
								<Link
									href={facebookPage}
									openInNewTab
									supplementalText={phrases.t("footer-block.facebook-link")}
								>
									<Icon name="Facebook" />
								</Link>
							) : null}
							{twitterUsername ? (
								<Link
									href={`https://twitter.com/${twitterUsername}`}
									openInNewTab
									supplementalText={phrases.t("footer-block.twitter-link")}
								>
									<Icon name="Twitter" />
								</Link>
							) : null}
							{rssUrl ? (
								<Link
									href={rssUrl}
									openInNewTab
									supplementalText={phrases.t("footer-block.rss-link")}
								>
									<Icon name="Rss" />
								</Link>
							) : null}
						</Stack>
					</div>
				) : null}
				<Paragraph>{copyrightText}</Paragraph>
			</section>
			{content?.children?.length ? (
				<Grid className={`${BLOCK_CLASS_NAME}__links`}>
					{/* The columns are 2D arrays of columns x column items. Iterate through both */}
					{content.children.map((column) =>
						column?.children?.length ? (
							<div className={`${BLOCK_CLASS_NAME}__links-group`} key={column._id}>
								{column.name ? (
									<HeadingSection>
										<Heading>{column.name}</Heading>
									</HeadingSection>
								) : null}
								<ul className={`${BLOCK_CLASS_NAME}__links-group-list`}>
									{column.children.map((item) => (
										<li className={`${BLOCK_CLASS_NAME}__links-group-list-item`} key={item._id}>
											{item.node_type === "link" ? (
												<Link href={item.url}>{item.display_name}</Link>
											) : (
												<Link href={item._id}>{item.name}</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						) : null
					)}
				</Grid>
			) : null}
			{logoUrl ? (
				<MediaItem>
					<Image
						alt={(lightBackgroundLogo ? lightBackgroundLogoAlt : primaryLogoAlt) || ""}
						className={`${BLOCK_CLASS_NAME}__logo`}
						src={logoUrl}
						height={64}
					/>
				</MediaItem>
			) : null}
			<div />
		</Stack>
	);
};

const Footer = ({ customFields }) => {
	const { isAdmin } = useFusionContext();
	if (customFields.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
			<FooterItem customFields={{ ...customFields }} />
		</LazyLoad>
	);
};

Footer.propTypes = {
	customFields: PropTypes.shape({
		navigationConfig: PropTypes.contentConfig("navigation-hierarchy").tag({
			group: "Configure Content",
			label: "Navigation",
		}),
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

Footer.label = "Footer – Arc Block";

Footer.icon = "arc-footer";

export default Footer;
