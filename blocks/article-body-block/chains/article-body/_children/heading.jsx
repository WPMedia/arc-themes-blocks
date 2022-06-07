import React from "react";

const Heading = ({ element }) => {
	const defaultHeaderLevel = 2;
	const HeadingLevel = `h${element.level ? element.level : defaultHeaderLevel}`;

	return <HeadingLevel dangerouslySetInnerHTML={{ __html: element.content }} />;
};

export default Heading;
