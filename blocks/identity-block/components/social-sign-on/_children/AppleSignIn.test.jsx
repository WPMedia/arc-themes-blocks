import React from "react";
import { render, screen } from "@testing-library/react";
import { useFusionContext } from "fusion:context";

import AppleSignIn from "./AppleSignIn";

const SITE_PROPS_MOCK = {
	breakpoints: {
		small: 0,
		medium: 768,
		large: 992,
	},
	websiteAdPath: "news",
	dfpId: 701,
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: () => <div data-testid="Apple-icon" />,
}));

describe("Identity Social Login Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useFusionContext.mockReturnValue({
			isAdmin: true,
			siteProperties: SITE_PROPS_MOCK,
		});
	});

	it("renders Apple button for signIn", () => {
		render(<AppleSignIn socialSignOnIn="Login" />);
		expect(screen.getByText("identity-block.social-signOn-apple-login")).not.toBeNull();
	});

	it("renders Apple button for signUp", () => {
		render(<AppleSignIn socialSignOnIn="SignUp" />);
		expect(screen.getByText("identity-block.social-signOn-apple-signUp")).not.toBeNull();
	});
});
