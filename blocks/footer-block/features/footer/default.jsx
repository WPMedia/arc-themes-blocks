import React from "react";
import styled from "styled-components";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import getThemeStyle from "fusion:themes";
// import Link from "@wpmedia/links-bar-block";
import {
	FacebookAltIcon,
	TwitterIcon,
	RssIcon,
	LazyLoad,
	isServerSide,
} from "@wpmedia/engine-theme-sdk";
import { PrimaryFont } from "@wpmedia/shared-styles";
import "./footer.scss";
// switch to component link when footer converting to V2
import Link from "./_children/link";

export const StyledSocialContainer = styled.div`
	border: ${(props) => (props.hasSocialLinks ? "1px" : "0")} solid ${(props) => props.primaryColor};
	fill: ${(props) => props.primaryColor};

	a {
		border-right: 1px solid ${(props) => props.primaryColor};
	}
`;

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

	const footerColumns = content && content.children ? content.children : [];

	const socialButtons = (
		<>
			{facebookPage ? (
				<a
					title={phrases.t("footer-block.facebook-link")}
					target="_blank"
					rel="noopener noreferrer"
					href={facebookPage}
				>
					<FacebookAltIcon fill={getThemeStyle(arcSite)["primary-color"]} />
				</a>
			) : (
				""
			)}
			{twitterUsername ? (
				<a
					title={phrases.t("footer-block.twitter-link")}
					target="_blank"
					rel="noopener noreferrer"
					href={`https://twitter.com/${twitterUsername}`}
				>
					<TwitterIcon fill={getThemeStyle(arcSite)["primary-color"]} />
				</a>
			) : (
				""
			)}
			{rssUrl ? (
				<a
					title={phrases.t("footer-block.rss-link")}
					target="_blank"
					rel="noopener noreferrer"
					href={rssUrl}
				>
					<RssIcon fill={getThemeStyle(arcSite)["primary-color"]} />
				</a>
			) : (
				""
			)}
		</>
	);

	return (
		<div className="container layout-section">
			<div className="section-separator">
				<section className="footer-header">
					<div className="footer-row">
						<div className="social-column">
							<StyledSocialContainer
								className="socialBtn-container"
								primaryColor={getThemeStyle(arcSite)["primary-color"]}
								hasSocialLinks={!!(facebookPage || twitterUsername || rssUrl)}
							>
								{socialButtons}
							</StyledSocialContainer>
						</div>
						<div className="copyright-column">
							{/* If large screen, show copyright over border */}
							<PrimaryFont
								as="p"
								className="copyright"
								id="copyright-top"
								style={{ width: "100%" }}
							>
								{copyrightText}
							</PrimaryFont>
						</div>
					</div>
				</section>
			</div>
			<div>
				{/* If small screen, show copyright under border */}
				<p className="copyright" id="copyright-bottom" style={{ width: "100%" }}>
					{copyrightText}
				</p>
			</div>
			<div className="row legacy-footer-row">
				{/* The columns are 2D arrays of columns x column items. Iterate through both */}
				{footerColumns.map((column) => {
					const columnItems = column.children
						? column.children.map((item) => (
								<li className="footer-item" key={item._id}>
									{item.node_type === "link" ? (
										<Link href={item.url} name={item.display_name} />
									) : (
										<Link href={item._id} name={item.name} />
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
		</div>
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
