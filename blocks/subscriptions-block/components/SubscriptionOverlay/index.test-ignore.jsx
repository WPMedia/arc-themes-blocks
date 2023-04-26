import React, { useState } from "react";
import { mount } from "enzyme";

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
		const wrapper = mount(<SubscriptionOverlay />);

		expect(wrapper.find(".xpmedia-subscription-overlay").at(0)).toExist();
	});

	it("renders required a11y properties", () => {
		const wrapper = mount(<SubscriptionOverlay />);

		expect(wrapper.find(".xpmedia-subscription-overlay").at(0).prop("role")).toEqual("alert");
	});

	it("renders a child in the appropriate container", () => {
		const wrapper = mount(
			<SubscriptionOverlay>
				<div className="findThis" />
			</SubscriptionOverlay>
		);

		expect(wrapper.find(".xpmedia-subscription-overlay-content > .findThis").at(0)).toExist();
	});

	it("handles scrolling", () => {
		// Scrolling is difficult to test functionality in Enzyme jsDoc so this just test the events
		const wrapper = mount(
			<SubscriptionOverlay>
				<div>Some Text</div>
			</SubscriptionOverlay>
		);
		const contentContainer = wrapper.find(".xpmedia-subscription-overlay-content").at(0);

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
		const wrapper = mount(
			<SubscriptionOverlay>
				<div>Some Text</div>
			</SubscriptionOverlay>
		);
		const contentContainer = wrapper.find(".xpmedia-subscription-overlay-content").at(0);

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
		const wrapper = mount(<ShowHide />);

		wrapper.find("button").at(0).simulate("click");
		expect(wrapper.find(".xpmedia-subscription-overlay").at(0)).toExist();

		wrapper.find(".xpmedia-subscription-overlay-content button").at(0).simulate("click");
		expect(wrapper.find(".xpmedia-subscription-overlay").at(0)).not.toExist();
	});
});
