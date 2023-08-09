import React from "react";
import LoginLinks from "./default";

export default {
	title: "Blocks/Identity/Blocks/Login Links",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const LoginLink = () => <LoginLinks customFields={{ showLogin: true }} />;

export const SignUpLink = () => <LoginLinks customFields={{ showSignUp: true }} />;

export const loginAndSignUpLink = () => (
	<LoginLinks customFields={{ showLogin: true, showSignUp: true }} />
);
