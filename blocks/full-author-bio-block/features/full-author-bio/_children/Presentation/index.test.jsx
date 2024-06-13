import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Presentation from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: ({ name }) => <div data-testid={name} />,
}));

const _id = "janedoe";
const byline = "Jane Da Doe";
const role = "Senior Product Manager";
const longBio = "She works on Arc Themes";
const image = "img.jpg";

describe("Full Author Bio Block", () => {
	beforeEach(() => {
		jest.spyOn(console, "error").mockImplementation((message) =>
			message === "No auth token provided for resizer"
				? null
				: // eslint-disable-next-line no-console
					console.warn("Error Thrown:", message),
		);
	});

	afterEach(() => {
		// eslint-disable-next-line no-console
		console.error.mockRestore();
	});

	it("should not render if the author is invalid", () => {
		const { container } = render(<Presentation />);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render the author url if it exists", () => {
		render(<Presentation author={{ _id, byline }} authorProfileLink="/author/profile" />);
		const link = screen.getByRole("link", { name: byline });
		expect(link).not.toBeNull();
		expect(link.href).toBe("http://localhost/author/profile");
	});

	it("should render the byline", () => {
		render(<Presentation author={{ _id, byline }} />);
		expect(screen.getByRole("heading", { name: byline })).not.toBeNull();
	});

	it("should render the role", () => {
		render(<Presentation author={{ _id, role }} />);
		expect(screen.getByRole("heading", { name: role })).not.toBeNull();
	});

	it("should render the long bio", () => {
		render(<Presentation author={{ _id, longBio }} />);
		expect(screen.getByText(longBio)).not.toBeNull();
	});

	it("should render the photo with byline alt text", () => {
		render(<Presentation author={{ _id, byline, image }} />);
		expect(screen.getByRole("img", { name: byline, exact: false })).not.toBeNull();
	});

	it("should render the photo without byline as blank alt text", () => {
		render(<Presentation author={{ _id, image }} />);
		expect(screen.getByRole("img", { name: "" })).not.toBeNull();
	});

	it("should render the resized photo if resizer information is available", () => {
		render(
			<Presentation
				author={{
					_id,
					image,
					byline: "resized image",

					ansImage: {
						url: "resized.jpg",
						auth: { 2: "12345" },
					},
				}}
			/>,
		);
		const resizedImage = screen.getByRole("img", { name: "resized image" });
		expect(resizedImage?.src).toBe(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=180&height=180",
		);
		const imageSrcSet = new Set(resizedImage?.srcset?.split(", "));
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=180&height=180 180w",
		);
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=360&height=360 360w",
		);
		expect(imageSrcSet).toContain(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=720&height=720 720w",
		);
	});

	it("should render the all the supported icons if specified", () => {
		render(
			<Presentation
				author={{
					_id,
					email: "janedoe",
					facebook: "janedoe",
					instagram: "janedoe",
					linkedin: "janedoe",
					medium: "janedoe",
					pinterest: "janedoe",
					reddit: "janedoe",
					rss: "janedoe",
					snapchat: "janedoe",
					soundcloud: "janedoe",
					tumblr: "janedoe",
					twitter: "janedoe",
					whatsapp: "janedoe",
					youtube: "janedoe",
				}}
			/>,
		);
		expect(screen.getByTestId("Envelope")).not.toBeNull();
		expect(screen.getByTestId("Facebook")).not.toBeNull();
		expect(screen.getByTestId("Instagram")).not.toBeNull();
		expect(screen.getByTestId("LinkedIn")).not.toBeNull();
		expect(screen.getByTestId("Medium")).not.toBeNull();
		expect(screen.getByTestId("Pinterest")).not.toBeNull();
		expect(screen.getByTestId("Reddit")).not.toBeNull();
		expect(screen.getByTestId("Rss")).not.toBeNull();
		expect(screen.getByTestId("Snapchat")).not.toBeNull();
		expect(screen.getByTestId("SoundCloud")).not.toBeNull();
		expect(screen.getByTestId("Tumblr")).not.toBeNull();
		expect(screen.getByTestId("Twitter")).not.toBeNull();
		expect(screen.getByTestId("WhatsApp")).not.toBeNull();
		expect(screen.getByTestId("Youtube")).not.toBeNull();
	});

	it("should not render the missing supported icon (twitter) if missing from author", () => {
		render(<Presentation author={{ _id, email: "janedoe", youtube: "janedoe" }} />);
		expect(screen.getByTestId("Envelope")).not.toBeNull();
		expect(screen.queryByTestId("Twitter")).toBeNull();
		expect(screen.getByTestId("Youtube")).not.toBeNull();
	});

	it("should render the email icon if specified", () => {
		render(<Presentation author={{ _id, email: "janedoe" }} />);
		expect(screen.getByTestId("Envelope")).not.toBeNull();
	});

	it("should render the Facebook icon if specified", () => {
		render(<Presentation author={{ _id, facebook: "janedoe" }} />);
		expect(screen.getByTestId("Facebook")).not.toBeNull();
	});

	it("should render the Instagram icon if specified", () => {
		render(<Presentation author={{ _id, instagram: "janedoe" }} />);
		expect(screen.getByTestId("Instagram")).not.toBeNull();
	});

	it("should render the LinkedIn icon if specified", () => {
		render(<Presentation author={{ _id, linkedin: "janedoe" }} />);
		expect(screen.getByTestId("LinkedIn")).not.toBeNull();
	});

	it("should render the RSS icon if specified", () => {
		render(<Presentation author={{ _id, rss: "janedoe" }} />);
		expect(screen.getByTestId("Rss")).not.toBeNull();
	});

	it("should render the Twitter icon if specified", () => {
		render(<Presentation author={{ _id, twitter: "janedoe" }} />);
		expect(screen.getByTestId("Twitter")).not.toBeNull();
	});

	it("should render the Medium icon if specified", () => {
		render(<Presentation author={{ _id, medium: "janedoe" }} />);
		expect(screen.getByTestId("Medium")).not.toBeNull();
	});

	it("should render the Pinterest icon if specified", () => {
		render(<Presentation author={{ _id, pinterest: "janedoe" }} />);
		expect(screen.getByTestId("Pinterest")).not.toBeNull();
	});

	it("should render the Reddit icon if specified", () => {
		render(<Presentation author={{ _id, reddit: "janedoe" }} />);
		expect(screen.getByTestId("Reddit")).not.toBeNull();
	});

	it("should render the Snapchat icon if specified", () => {
		render(<Presentation author={{ _id, snapchat: "janedoe" }} />);
		expect(screen.getByTestId("Snapchat")).not.toBeNull();
	});

	it("should render the SoundCloud icon if specified", () => {
		render(<Presentation author={{ _id, soundcloud: "janedoe" }} />);
		expect(screen.getByTestId("SoundCloud")).not.toBeNull();
	});

	it("should render the Tumblr icon if specified", () => {
		render(<Presentation author={{ _id, tumblr: "janedoe" }} />);
		expect(screen.getByTestId("Tumblr")).not.toBeNull();
	});

	it("should render the WhatsApp icon if specified", () => {
		render(<Presentation author={{ _id, whatsapp: "janedoe" }} />);
		expect(screen.getByTestId("WhatsApp")).not.toBeNull();
	});

	it("should render the Youtube icon if specified", () => {
		render(<Presentation author={{ _id, youtube: "janedoe" }} />);
		expect(screen.getByTestId("Youtube")).not.toBeNull();
	});
});
