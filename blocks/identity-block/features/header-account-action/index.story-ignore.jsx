/* eslint-disable react/no-children-prop */
import React from "react";
import HeaderAccountAction from "./default";

export default {
	title: "Blocks/Identity/Blocks/Header Account Action",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const loginAndSignUp = () => (
	<HeaderAccountAction customFields={{ loginURL: "/", createAccountURL: "/" }} />
);
