import React from "react";

// presentational component handles only visual
const Headline = ({ headlineString }) =>
	/*
    if string is default empty from presentational container,
    then render null
  */
	headlineString !== "" ? (
		<h1
			className="b-headline"
			// dangerouslySetInnerHTML seems to be a pattern for blocks
			dangerouslySetInnerHTML={{ __html: headlineString }}
		/>
	) : null;

export default Headline;
