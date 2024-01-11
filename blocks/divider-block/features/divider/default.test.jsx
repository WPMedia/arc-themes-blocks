import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Divider from "./default";

describe("Divider", () => {
	it("should render", () => {
		const { container } = render(<Divider />);
		expect(container.getElementsByTagName("hr")).not.toBeNull();
	});
});
