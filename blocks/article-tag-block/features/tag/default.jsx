import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import styled from "styled-components";
import { useFusionContext } from "fusion:context";
import getThemeStyle from "fusion:themes";
import { LazyLoad, isServerSide } from "@wpmedia/engine-theme-sdk";
import { LinkBackgroundHover } from "@wpmedia/news-theme-css/js/styled/linkHovers";
import { PrimaryFont } from "@wpmedia/shared-styles";
import "./tags.scss";

const Tags = styled(LinkBackgroundHover)`
	background-color: ${(props) => props.primaryColor};
`;

export const ArticleTagItems = ({ content, arcSite }) => {
	const { "primary-color": primaryColor } = getThemeStyle(arcSite);
	const defaultBackgroundColor = "#14689A";
	const { taxonomy: { tags = [] } = {} } = content;

	return tags.length ? (
		<PrimaryFont as="div" className="tags-holder">
			{tags.map((tag) => {
				const slug = tag.slug || "#";
				const href = slug !== "#" ? encodeURI(`/tags/${slug}/`) : "#";
				return (
					<Tags
						key={tag.text}
						className="tags"
						href={href}
						primaryColor={primaryColor || defaultBackgroundColor}
					>
						{tag.text}
					</Tags>
				);
			})}
		</PrimaryFont>
	) : null;
};

const ArticleTagsContainer = () => {
	const { arcSite, globalContent: content } = useFusionContext();

	return <ArticleTagItems arcSite={arcSite} content={content} />;
};

const ArticleTags = ({ customFields = {} }) => {
	const { isAdmin } = useFusionContext();
	if (customFields?.lazyLoad && isServerSide() && !isAdmin) {
		// On Server
		return null;
	}
	return (
		<LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
			<ArticleTagsContainer />
		</LazyLoad>
	);
};

ArticleTags.label = "Tags Bar – Arc Block";

ArticleTags.icon = "tags";

ArticleTags.propTypes = {
	customFields: PropTypes.shape({
		lazyLoad: PropTypes.bool.tag({
			name: "Lazy Load block?",
			defaultValue: false,
			description:
				"Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.",
		}),
	}),
};

export default ArticleTags;
