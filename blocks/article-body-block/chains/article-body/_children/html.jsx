import React from "react";
import Static from "fusion:static";

const HTML = ({ className, content, id }) =>
	!content ? null : (
		<Static id={`article-html-block-${id}`}>
			<div className={className} dangerouslySetInnerHTML={{ __html: content }} />
		</Static>
	);

export default HTML;
