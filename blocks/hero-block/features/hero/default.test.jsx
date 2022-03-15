import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Hero from "./default";

describe("Hero", () => {
	it("should render", () => {
		render(
			<Hero
				customFields={{
					imageURL: "image",
					headline: "My Headline",
					subHeadline: "My Sub Headline",
					description: "My description",
				}}
			/>
		);
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.queryByText("My Headline")).toBeInTheDocument();
		expect(screen.queryByText("My Sub Headline")).toBeInTheDocument();
		expect(screen.queryByText("My description")).toBeInTheDocument();
	});

	it("should not render headline", () => {
		render(<Hero customFields={{ imageURL: "image" }} />);
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.queryByText("My Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My Sub Headline")).not.toBeInTheDocument();
		expect(screen.queryByText("My description")).not.toBeInTheDocument();
	});
});
