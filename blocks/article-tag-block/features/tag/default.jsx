import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";
import { isServerSide, LazyLoad, Pill, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-article-tag";

export const ArticleTagItems = ({ content }) => {
	const { taxonomy: { tags = [] } = {} } = content;

	return tags.length ? (
		<Stack className={BLOCK_CLASS_NAME} direction="horizontal" wrap="wrap" justification="center" data-testid="article-container">
			{tags.map((tag) => {
				// fallback to "" because some tags don't have a slug
				const { slug = "" } = tag;

				const href = slug !== "" ? encodeURI(`/tags/${slug}/`) : "";

				return (
					<Pill key={tag.text} href={href}>
						{tag.text}
					</Pill>
				);
			})}
		</Stack>
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
