import React from "react";

const Heading = ({ element, classPrefix = "" }) => {
	const defaultHeaderLevel = 2;
	const HeadingLevel = `h${element.level ? element.level : defaultHeaderLevel}`;
	const className = classPrefix ? `${classPrefix}__${HeadingLevel}` : null;

	return (
		<HeadingLevel className={className} dangerouslySetInnerHTML={{ __html: element.content }} />
	);
};

export default Heading;
