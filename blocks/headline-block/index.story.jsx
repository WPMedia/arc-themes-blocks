import React from "react";
import Headline from "./features/headline/_children/headline";

export default {
	title: "Blocks/Headline",
};

export const customHeadline = (args) => (
	<Headline { ...args } />
);

customHeadline.args = {
	headlineString: "Man Bites Dog",
};
