import React from "react";
import { render, screen } from "@testing-library/react";
import ArcAdminAd from "./index";

const defaults = {
	props: {
		adClass: "test-ad-class",
		adType: "test-ad-name",
		slotName: "test-slot-name",
		dimensions: [
			[1, 1],
			[1, 1],
			[1, 1],
		],
	},
};

describe("<ArcAdminAd>", () => {
	it("renders with ad name", () => {
		render(<ArcAdminAd {...defaults.props} />);
		expect(screen.getByText("test-ad-name")).not.toBeNull();
	});

	it("renders with default ad name", () => {
		const adProps = {
			...defaults.props,
			adType: undefined,
		};
		render(<ArcAdminAd {...adProps} />);
		expect(screen.getByText("Ad Name N/A")).not.toBeNull();
	});
});
