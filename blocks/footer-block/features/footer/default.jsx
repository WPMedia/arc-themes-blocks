import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { PrimaryFont } from "@wpmedia/shared-styles";
import { Grid, Icon, Paragraph, Stack, Link } from "@wpmedia/arc-themes-components";

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
		locale = "en",
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

	const footerColumns = content && content.children ? content.children : [];

	const socialButtons = (
		<>
			{facebookPage ? (
				<Link
					supplementalText={phrases.t("footer-block.facebook-link")}
					openInNewTab
					href={facebookPage}
				>
					<Icon name="Facebook" />
				</Link>
			) : (
				""
			)}
			{twitterUsername ? (
				<Link
					supplementalText={phrases.t("footer-block.twitter-link")}
					openInNewTab
					href={`https://twitter.com/${twitterUsername}`}
				>
					<Icon name="Twitter" />
				</Link>
			) : (
				""
			)}
			{rssUrl ? (
				<Link supplementalText={phrases.t("footer-block.rss-link")} openInNewTab href={rssUrl}>
					<Icon name="Rss" />
				</Link>
			) : (
				""
			)}
		</>
	);

	return (
		<Grid className={BLOCK_CLASS_NAME}>
			<section className={`${BLOCK_CLASS_NAME}__top-container`}>
				{facebookPage || twitterUsername || rssUrl ? (
					<Stack className={`${BLOCK_CLASS_NAME}__social-links`} direction="horizontal">
						{socialButtons}
					</Stack>
				) : null}
				<Paragraph>{copyrightText}</Paragraph>
			</section>
			<div className="row legacy-footer-row">
				{/* The columns are 2D arrays of columns x column items. Iterate through both */}
				{footerColumns.map((column) => {
					const columnItems = column.children
						? column.children.map((item) => (
								<li className="footer-item" key={item._id}>
									{item.node_type === "link" ? (
										<Link href={item.url}>{item.display_name}</Link>
									) : (
										<Link href={item._id}>{item.name}</Link>
									)}
								</li>
						  ))
						: [];

					if (columnItems.length === 0) {
						return null;
					}

					return (
						<div className="footer-section col-sm-12 col-md-6 col-lg-xl-3" key={column._id}>
							{column.name ? (
								<PrimaryFont as="h4" className="footer-header">
									{column.name}
								</PrimaryFont>
							) : null}
							<PrimaryFont as="ul">{columnItems}</PrimaryFont>
						</div>
					);
				})}
			</div>
			{logoUrl ? (
				<div className="primaryLogo">
					<img
						src={logoUrl}
						alt={(lightBackgroundLogo ? lightBackgroundLogoAlt : primaryLogoAlt) || ""}
						className="footer-logo"
					/>
				</div>
			) : null}
		</Grid>
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
