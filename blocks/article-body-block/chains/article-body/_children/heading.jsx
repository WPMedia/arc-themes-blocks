import React from "react";

const Heading = ({ element, classPrefix }) => {
	const defaultHeaderLevel = 2;
	const HeadingLevel = `h${element.level ? element.level : defaultHeaderLevel}`;

	return (
		<HeadingLevel
			className={`${classPrefix}__${HeadingLevel}`}
			dangerouslySetInnerHTML={{ __html: element.content }}
		/>
	);
};

export default Heading;
