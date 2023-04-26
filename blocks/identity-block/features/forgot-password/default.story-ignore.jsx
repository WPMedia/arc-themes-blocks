import React from "react";

import ForgotPassword from "./default";

export default {
	title: "Blocks/Identity/Blocks/Forgot Password",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

export const basic = () => <ForgotPassword />;
