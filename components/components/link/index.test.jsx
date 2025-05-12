import { render, screen } from "@testing-library/react";

import Link from ".";

const EXTERNAL_LINK_DESTINATION = "https://www.arcxp.com/";
const INTERNAL_LINK_DESTINATION = "/";
const LINK_TEXT = "Arc XP";

describe("Link", () => {
	it("should render string child", () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		expect(screen.queryByText(LINK_TEXT)).not.toBeNull();
	});

	it("should allow pass through of props", () => {
		render(
			<Link href={INTERNAL_LINK_DESTINATION} id="custom-id" data-custom="custom">
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("id", "custom-id");
		expect(linkOutput).toHaveAttribute("data-custom", "custom");
	});

	it("should render rel property and target blank for external links", () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("rel", "noreferrer");
		expect(linkOutput).toHaveAttribute("target", "_blank");
	});

	it("should render rel property and target blank for internal links electing to open in new tab", () => {
		render(
			<Link href={INTERNAL_LINK_DESTINATION} openInNewTab>
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("rel", "noreferrer");
		expect(linkOutput).toHaveAttribute("target", "_blank");
	});

	it("should not render rel property and target blank by default for internal links", () => {
		render(<Link href={INTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("rel");
		expect(linkOutput).not.toHaveAttribute("target");
	});

	it("should not render rel property and target blank for external links electing to open in the same tab", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} openInNewTab={false}>
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("rel");
		expect(linkOutput).not.toHaveAttribute("target");
	});

	it("should take in additional classnames", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} className="test-class">
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveClass("test-class");
	});

	it("should respond to assistiveHidden and show tab index -1 and aria-hidden", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} assistiveHidden>
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).toHaveAttribute("aria-hidden", "true");
		expect(linkOutput).toHaveAttribute("tabIndex", "-1");
	});

	it("should not show assistive hidden properties if false", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} assistiveHidden={false}>
				{LINK_TEXT}
			</Link>
		);

		const linkOutput = screen.queryByText(LINK_TEXT);

		expect(linkOutput).not.toHaveAttribute("aria-hidden");
		expect(linkOutput).not.toHaveAttribute("tabIndex");
	});

	it("should render hidden text with visually-hidden class", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} supplementalText="RSS Link">
				{LINK_TEXT}
			</Link>
		);

		const additionalHiddenText = screen.queryByText("RSS Link");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});

	it("should render default open new tab text if no supplemental text and new tab", () => {
		render(<Link href={EXTERNAL_LINK_DESTINATION}>{LINK_TEXT}</Link>);

		const additionalHiddenText = screen.queryByText("Opens in new window");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});

	it("should render default open new tab text if no supplemental text and new tab", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} openInNewTab>
				{LINK_TEXT}
			</Link>
		);

		const additionalHiddenText = screen.queryByText("Opens in new window");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});

	it("should render no supplemental text if no supplemental text and same tab", () => {
		render(<Link href="/">{LINK_TEXT}</Link>);

		const additionalHiddenText = screen.queryByText("Opens in new window");
		expect(additionalHiddenText).toBeNull();
	});

	it("should render supplemental text regardless of new tab behavior", () => {
		render(
			<Link href={EXTERNAL_LINK_DESTINATION} openInNewTab supplementalText="RSS Link">
				{LINK_TEXT}
			</Link>
		);

		const additionalHiddenText = screen.queryByText("RSS Link");

		expect(additionalHiddenText).toHaveClass("visually-hidden");
	});
});
