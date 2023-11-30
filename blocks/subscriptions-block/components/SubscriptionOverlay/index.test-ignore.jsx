import React, { useState } from "react";
import { render } from "@testing-library/react";

import SubscriptionOverlay from ".";

Object.defineProperty(global.document, "ownerDocument", {
	value: global.document,
});
Object.defineProperty(global.document, "scrollingElement", {
	value: global.document,
});
Object.defineProperty(global.document, "style", {
	value: { overflow: "auto" },
});

describe("SubscriptionOverlay", () => {
	it("renders with minimal required properties", () => {
		render(<SubscriptionOverlay />);

		expect(screen.find(".xpmedia-subscription-overlay").at(0)).toExist();
	});

	it("renders required a11y properties", () => {
		render(<SubscriptionOverlay />);

        expect(screen.getByRole("alert").length).toEqual(1);
	});

	it("renders a child in the appropriate container", () => {
		render(
			<SubscriptionOverlay>
				<div className="findThis" />
			</SubscriptionOverlay>
		);

		expect(screen.find(".xpmedia-subscription-overlay-content > .findThis").at(0)).toExist();
	});

	it("handles scrolling", () => {
		// Scrolling is difficult to test functionality in Enzyme jsDoc so this just test the events
		render(
			<SubscriptionOverlay>
				<div>Some Text</div>
			</SubscriptionOverlay>
		);
		const contentContainer = screen.find(".xpmedia-subscription-overlay-content").at(0);

		const eventUp = {
			deltaY: 1,
		};
		contentContainer.simulate("wheel", eventUp);

		const eventDown = {
			deltaY: -1,
		};
		contentContainer.simulate("wheel", eventDown);

		expect(contentContainer).toExist();
	});

	it("handles touch events", () => {
		// Scrolling is difficult to test functionality in Enzyme jsDoc so this just test the events
		render(
			<SubscriptionOverlay>
				<div>Some Text</div>
			</SubscriptionOverlay>
		);
		const contentContainer = screen.find(".xpmedia-subscription-overlay-content").at(0);

		const eventStart = {
			changedTouches: [{ clientY: 9 }],
		};
		contentContainer.simulate("touchstart", eventStart);

		const eventUp = {
			changedTouches: [{ clientY: 10 }],
		};
		contentContainer.simulate("touchmove", eventUp);

		const eventDown = {
			changedTouches: [{ clientY: 9 }],
		};
		contentContainer.simulate("touchmove", eventDown);

		expect(contentContainer).toExist();
	});

	it("cleans itself up", () => {
		const ShowHide = () => {
			const [visible, setVisible] = useState(false);
			const Button = () => (
				<div>
					<button onClick={() => setVisible(!visible)} type="button">
						{visible ? "Hide" : "Show"}
					</button>
				</div>
			);
			return (
				<>
					<Button />
					{visible ? (
						<SubscriptionOverlay>
							<Button />
						</SubscriptionOverlay>
					) : null}
				</>
			);
		};
		render(<ShowHide />);

		
		expect(system.find(".xpmedia-subscription-overlay").at(0)).toExist();

		system.find(".xpmedia-subscription-overlay-content button").at(0).simulate("click");
		expect(system.find(".xpmedia-subscription-overlay").at(0)).not.toExist();
	});
});