import { render, screen } from "@testing-library/react";

import Heading from "./heading";
import HeadingSection from "./section";

describe("Heading", () => {
	it("should render as an h1 by default", () => {
		render(<Heading>Hello World</Heading>);
		const headingOutput = screen.getByRole("heading", {
			level: 1,
			name: "Hello World",
		});
		expect(headingOutput).toHaveClass("c-heading");
	});

	it("should allow pass through of props", () => {
		render(<Heading id="custom-id">Hello World</Heading>);
		const headingOutput = screen.getByRole("heading", {
			level: 1,
			name: "Hello World",
		});
		expect(headingOutput).toHaveAttribute("id", "custom-id");
	});

	it("should not apply truncation by default", () => {
		const { container } = render(<Heading>Heading Text</Heading>);
		expect(container.querySelector(".c-heading").getAttribute("style")).toBe(null);
	});

	it("should apply truncation when specified", () => {
		const { container } = render(<Heading truncationLines={3}>Heading Text</Heading>);
		expect(container.querySelector(".c-heading").getAttribute("style")).toContain(
			"--heading-truncation: 3;"
		);
	});

	it("should render additional classes", () => {
		render(<Heading className="test-class">Hello World</Heading>);
		const headingOutput = screen.getByRole("heading", {
			level: 1,
			name: "Hello World",
		});
		expect(headingOutput).toHaveClass("c-heading test-class");
	});
});

describe("HeadingSection", () => {
	it("should render as a h2 when wrapping heading", () => {
		render(
			<HeadingSection>
				<Heading>Heading Text</Heading>
			</HeadingSection>
		);

		const headingOutput = screen.getByRole("heading", { level: 2 });
		expect(headingOutput).not.toBeNull();
	});

	it("increases the heading level for each HeadingSection until level 6", () => {
		render(
			<div>
				<Heading>h1 text</Heading>
				<HeadingSection>
					<Heading>h2 text</Heading>
					<HeadingSection>
						<Heading>h3 text</Heading>
						<HeadingSection>
							<Heading>h4 text</Heading>
							<HeadingSection>
								<Heading>h5 text</Heading>
								<HeadingSection>
									<Heading>h6 text</Heading>
									<HeadingSection>
										{/* level 7 but max level 6 per heading logic */}
										<Heading>h6 text level 7</Heading>
									</HeadingSection>
								</HeadingSection>
							</HeadingSection>
						</HeadingSection>
					</HeadingSection>
				</HeadingSection>
			</div>
		);

		const headingOutputLevelOne = screen.getByRole("heading", {
			level: 1,
			name: "h1 text",
		});
		expect(headingOutputLevelOne).not.toBeNull();

		const headingOutputLevelTwo = screen.getByRole("heading", {
			level: 2,
			name: "h2 text",
		});
		expect(headingOutputLevelTwo).not.toBeNull();

		const headingOutputLevelThree = screen.getByRole("heading", {
			level: 3,
			name: "h3 text",
		});
		expect(headingOutputLevelThree).not.toBeNull();

		const headingOutputLevelFour = screen.getByRole("heading", {
			level: 4,
			name: "h4 text",
		});
		expect(headingOutputLevelFour).not.toBeNull();

		const headingOutputLevelFive = screen.getByRole("heading", {
			level: 5,
			name: "h5 text",
		});
		expect(headingOutputLevelFive).not.toBeNull();

		const headingOutputLevelSix = screen.getByRole("heading", {
			level: 6,
			name: "h6 text",
		});
		expect(headingOutputLevelSix).not.toBeNull();

		const headingOutputLevelSeven = screen.getByRole("heading", {
			level: 6,
			name: "h6 text level 7",
		});
		expect(headingOutputLevelSeven).not.toBeNull();
	});
});
