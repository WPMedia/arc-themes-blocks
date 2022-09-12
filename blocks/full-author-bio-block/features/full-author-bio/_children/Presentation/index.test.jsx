import React from "react";
import { render, screen } from "@testing-library/react";

import Presentation from ".";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	Icon: ({ name }) => <div data-testid={name} />,
}));

describe("Full Author Bio Block", () => {
	it("should not render if the author is invalid", () => {
		const author = undefined;
		const { container } = render(<Presentation arcSite="test-site" author={author} />);

		expect(container.firstChild).toBeNull();
	});

	it("should render the author url if the linkAuthorProfile if true", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
			url: "/author/profile",
		};
		render(<Presentation arcSite="test-site" author={author} linkAuthorProfile />);
		const link = screen.queryByRole("link", { name: author.byline });
		expect(link).not.toBeNull();
		expect(link.href).toBe("http://localhost/author/profile");
	});

	it("should render the byline", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByRole("heading", { name: author.byline })).not.toBeNull();
	});

	it("should render the role", () => {
		const author = {
			_id: "janedoe",
			role: "Senior Product Manager",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByRole("heading", { name: author.role })).not.toBeNull();
	});

	it("should render the long bio", () => {
		const author = {
			_id: "janedoe",
			longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByText("She works on Arc Themes", { exact: false })).not.toBeNull();
	});

	it("should render the photo with byline alt text", () => {
		const author = {
			_id: "janedoe",
			byline: "Jane Da Doe",
			image: "image.jpg",
			resized_params: { "158x158": "" },
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByRole("img", { name: author.byline })).not.toBeNull();
	});

	it("should render the photo without byline as blank alt text", () => {
		const author = {
			_id: "janedoe",
			image: "img.jpg",
			resized_params: { "158x158": "" },
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByRole("img", { name: "" })).not.toBeNull();
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
		expect(screen.queryByTestId("Envelope")).not.toBeNull();
		expect(screen.queryByTestId("Facebook")).not.toBeNull();
		expect(screen.queryByTestId("Instagram")).not.toBeNull();
		expect(screen.queryByTestId("LinkedIn")).not.toBeNull();
		expect(screen.queryByTestId("Medium")).not.toBeNull();
		expect(screen.queryByTestId("Pinterest")).not.toBeNull();
		expect(screen.queryByTestId("Reddit")).not.toBeNull();
		expect(screen.queryByTestId("Rss")).not.toBeNull();
		expect(screen.queryByTestId("Snapchat")).not.toBeNull();
		expect(screen.queryByTestId("SoundCloud")).not.toBeNull();
		expect(screen.queryByTestId("Tumblr")).not.toBeNull();
		expect(screen.queryByTestId("Twitter")).not.toBeNull();
		expect(screen.queryByTestId("WhatsApp")).not.toBeNull();
		expect(screen.queryByTestId("Youtube")).not.toBeNull();
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
		expect(screen.queryByTestId("Envelope")).not.toBeNull();
		expect(screen.queryByTestId("Facebook")).not.toBeNull();
		expect(screen.queryByTestId("Instagram")).not.toBeNull();
		expect(screen.queryByTestId("LinkedIn")).not.toBeNull();
		expect(screen.queryByTestId("Medium")).not.toBeNull();
		expect(screen.queryByTestId("Pinterest")).not.toBeNull();
		expect(screen.queryByTestId("Reddit")).not.toBeNull();
		expect(screen.queryByTestId("Rss")).not.toBeNull();
		expect(screen.queryByTestId("Snapchat")).not.toBeNull();
		expect(screen.queryByTestId("SoundCloud")).not.toBeNull();
		expect(screen.queryByTestId("Tumblr")).not.toBeNull();
		expect(screen.queryByTestId("Twitter")).toBeNull();
		expect(screen.queryByTestId("WhatsApp")).not.toBeNull();
		expect(screen.queryByTestId("Youtube")).not.toBeNull();
	});

	it("should render the email icon if specified", () => {
		const author = {
			_id: "janedoe",
			email: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Envelope")).not.toBeNull();
	});

	it("should render the Facebook icon if specified", () => {
		const author = {
			_id: "janedoe",
			facebook: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Facebook")).not.toBeNull();
	});

	it("should render the Instagram icon if specified", () => {
		const author = {
			_id: "janedoe",
			instagram: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Instagram")).not.toBeNull();
	});

	it("should render the LinkedIn icon if specified", () => {
		const author = {
			_id: "janedoe",
			linkedin: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("LinkedIn")).not.toBeNull();
	});

	it("should render the RSS icon if specified", () => {
		const author = {
			_id: "janedoe",
			rss: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Rss")).not.toBeNull();
	});

	it("should render the Twitter icon if specified", () => {
		const author = {
			_id: "janedoe",
			twitter: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Twitter")).not.toBeNull();
	});

	it("should render the Medium icon if specified", () => {
		const author = {
			_id: "janedoe",
			medium: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Medium")).not.toBeNull();
	});

	it("should render the Pinterest icon if specified", () => {
		const author = {
			_id: "janedoe",
			pinterest: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Pinterest")).not.toBeNull();
	});

	it("should render the Reddit icon if specified", () => {
		const author = {
			_id: "janedoe",
			reddit: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Reddit")).not.toBeNull();
	});

	it("should render the Snapchat icon if specified", () => {
		const author = {
			_id: "janedoe",
			snapchat: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Snapchat")).not.toBeNull();
	});

	it("should render the SoundCloud icon if specified", () => {
		const author = {
			_id: "janedoe",
			soundcloud: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("SoundCloud")).not.toBeNull();
	});

	it("should render the Tumblr icon if specified", () => {
		const author = {
			_id: "janedoe",
			tumblr: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Tumblr")).not.toBeNull();
	});

	it("should render the WhatsApp icon if specified", () => {
		const author = {
			_id: "janedoe",
			whatsapp: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("WhatsApp")).not.toBeNull();
	});

	it("should render the Youtube icon if specified", () => {
		const author = {
			_id: "janedoe",
			youtube: "janedoe",
		};
		render(<Presentation arcSite="test-site" author={author} />);
		expect(screen.queryByTestId("Youtube")).not.toBeNull();
	});
});
