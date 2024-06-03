import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Presentation from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: ({ name }) => <div data-testid={name} />,
}));

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
		const author = undefined;
		const { container } = render(<Presentation arcSite="test-site" author={author} />);

		expect(container).toBeEmptyDOMElement();
	});

	it("should render the author url if the authorProfileLink if true", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
		};
		render(
			<Presentation arcSite="test-site" author={author} authorProfileLink="/author/profile" />,
		);
		const link = screen.getByRole("link", { name: author.byline });
		expect(link).not.toBeNull();
		expect(link.href).toBe("http://localhost/author/profile");
	});

	it("should render the byline", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByRole("heading", { name: author.byline })).not.toBeNull();
	});

	it("should render the role", () => {
		const author = {
			_id: "janedoe",
			role: "Senior Product Manager",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByRole("heading", { name: author.role })).not.toBeNull();
	});

	it("should render the long bio", () => {
		const author = {
			_id: "janedoe",
			longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByText("She works on Arc Themes", { exact: false })).not.toBeNull();
	});

	it("should render the photo with byline alt text", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
			image: "image.jpg",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByRole("img", { name: author.byline })).not.toBeNull();
	});

	it("should render the photo without byline as blank alt text", () => {
		const author = {
			_id: "janedoe",
			image: "img.jpg",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByRole("img", { name: "" })).not.toBeNull();
	});

	it("should render the resized photo if resizer information is available", () => {
		const author = {
			_id: "janedoe",
			image: "img.jpg",
			byline: "resized image",
			ansImage: {
				url: "resized.jpg",
				auth: { 2: "12345" },
			},
		};
		render(<Presentation arcSite="test-site" author={author} />);
		const image = screen.getByRole("img", {
			name: "resized image",
		});
		expect(image?.src).toBe(
			"http://url.com/resized.jpg?smart=true&auth=12345&width=180&height=180",
		);
		const imageSrcSet = new Set(image?.srcset?.split(", "));
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
		const author = {
			_id: "janedoe",
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
		};
		render(<Presentation arcSite="test-site" author={author} />);
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
		const author = {
			_id: "janedoe",
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
			whatsapp: "janedoe",
			youtube: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
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
		expect(screen.queryByTestId("Twitter")).toBeNull();
		expect(screen.getByTestId("WhatsApp")).not.toBeNull();
		expect(screen.getByTestId("Youtube")).not.toBeNull();
	});

	it("should render the email icon if specified", () => {
		const author = {
			_id: "janedoe",
			email: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Envelope")).not.toBeNull();
	});

	it("should render the Facebook icon if specified", () => {
		const author = {
			_id: "janedoe",
			facebook: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Facebook")).not.toBeNull();
	});

	it("should render the Instagram icon if specified", () => {
		const author = {
			_id: "janedoe",
			instagram: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Instagram")).not.toBeNull();
	});

	it("should render the LinkedIn icon if specified", () => {
		const author = {
			_id: "janedoe",
			linkedin: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("LinkedIn")).not.toBeNull();
	});

	it("should render the RSS icon if specified", () => {
		const author = {
			_id: "janedoe",
			rss: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Rss")).not.toBeNull();
	});

	it("should render the Twitter icon if specified", () => {
		const author = {
			_id: "janedoe",
			twitter: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Twitter")).not.toBeNull();
	});

	it("should render the Medium icon if specified", () => {
		const author = {
			_id: "janedoe",
			medium: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Medium")).not.toBeNull();
	});

	it("should render the Pinterest icon if specified", () => {
		const author = {
			_id: "janedoe",
			pinterest: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Pinterest")).not.toBeNull();
	});

	it("should render the Reddit icon if specified", () => {
		const author = {
			_id: "janedoe",
			reddit: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Reddit")).not.toBeNull();
	});

	it("should render the Snapchat icon if specified", () => {
		const author = {
			_id: "janedoe",
			snapchat: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Snapchat")).not.toBeNull();
	});

	it("should render the SoundCloud icon if specified", () => {
		const author = {
			_id: "janedoe",
			soundcloud: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("SoundCloud")).not.toBeNull();
	});

	it("should render the Tumblr icon if specified", () => {
		const author = {
			_id: "janedoe",
			tumblr: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Tumblr")).not.toBeNull();
	});

	it("should render the WhatsApp icon if specified", () => {
		const author = {
			_id: "janedoe",
			whatsapp: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("WhatsApp")).not.toBeNull();
	});

	it("should render the Youtube icon if specified", () => {
		const author = {
			_id: "janedoe",
			youtube: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.getByTestId("Youtube")).not.toBeNull();
	});
});
