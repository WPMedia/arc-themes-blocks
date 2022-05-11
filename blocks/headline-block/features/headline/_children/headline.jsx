import React from "react";
import { Heading } from "@wpmedia/arc-themes-components";

// presentational component handles only visual
const Headline = ({ headlineString = "" }) =>
	/*
    if string is default empty from presentational container,
    then render null
  */
	headlineString !== "" ? (
		<Heading
			// dangerouslySetInnerHTML seems to be a pattern for blocks
			dangerouslySetInnerHTML={{ __html: headlineString }}
		/>
	) : null;

export default Headline;
