import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CategoryCarousel from "./default";

describe("Category Carousel", () => {
	it("should render", () => {
		const { unmount } = render(
			<CategoryCarousel
				customFields={{
					imageUrl_0: "#",
					label_0: "Test 1",
					linkUrl_0: "#",
					imageUrl_1: "#",
					label_1: "Test 2",
					linkUrl_1: "#",
					imageUrl_2: "#",
					label_2: "Test 3",
					linkUrl_2: "#",
					imageUrl_3: "#",
					label_3: "Test 4",
					linkUrl_3: "#",
				}}
			/>
		);
		expect(screen.queryByText("Test 1")).toBeInTheDocument();
		expect(screen.queryByText("Test 2")).toBeInTheDocument();
		expect(screen.queryByText("Test 3")).toBeInTheDocument();
		expect(screen.queryByText("Test 4")).toBeInTheDocument();
		unmount();
	});

	it("should render the optional header", () => {
		const { unmount } = render(
			<CategoryCarousel
				customFields={{
					headerText: "Heading Text",
					imageUrl_0: "#",
					label_0: "Test 1",
					linkUrl_0: "#",
					imageUrl_1: "#",
					label_1: "Test 2",
					linkUrl_1: "#",
					imageUrl_2: "#",
					label_2: "Test 3",
					linkUrl_2: "#",
					imageUrl_3: "#",
					label_3: "Test 4",
					linkUrl_3: "#",
				}}
			/>
		);
		expect(screen.queryByText("Heading Text")).toBeInTheDocument();
		unmount();
	});

	it("should render nothing for less than 4 items", () => {
		const { unmount } = render(<CategoryCarousel customFields={{ headerText: "Heading Text" }} />);
		expect(screen.queryByText("Heading Text")).not.toBeInTheDocument();
		unmount();
	});

	it("should not render incomplete items", () => {
		const { unmount } = render(
			<CategoryCarousel
				customFields={{
					imageUrl_0: "#",
					label_0: "Test 1",
					linkUrl_0: "#",
					imageUrl_1: "#",
					label_1: "Test 2",
					linkUrl_1: "#",
					imageUrl_2: "#",
					label_2: "Test 3",
					linkUrl_2: "#",
					imageUrl_3: "#",
					label_3: "Test 4",
					linkUrl_3: "#",
					label_4: "Incomplete 1",
					linkUrl_4: "#",
					imageUrl_5: "#",
					label_5: "Incomplete 2",
					imageUrl_6: "#",
					label_6: "ummm",
					linkUrl_6: "/incomplete/3",
				}}
			/>
		);
		expect(screen.queryByText("Test 1")).toBeInTheDocument();
		expect(screen.queryByText("Test 2")).toBeInTheDocument();
		expect(screen.queryByText("Test 3")).toBeInTheDocument();
		expect(screen.queryByText("Test 4")).toBeInTheDocument();
		expect(screen.queryAllByRole("group").length).toBe(4);
		unmount();
	});

	it("should only render a max of 12 items", () => {
		const { unmount } = render(
			<CategoryCarousel
				customFields={{
					imageUrl_0: "#",
					label_0: "Test 1",
					linkUrl_0: "#",
					imageUrl_1: "#",
					label_1: "Test 2",
					linkUrl_1: "#",
					imageUrl_2: "#",
					label_2: "Test 3",
					linkUrl_2: "#",
					imageUrl_3: "#",
					label_3: "Test 4",
					linkUrl_3: "#",
					imageUrl_4: "#",
					label_4: "Test 5",
					linkUrl_4: "#",
					imageUrl_5: "#",
					label_5: "Test 6",
					linkUrl_5: "#",
					imageUrl_6: "#",
					label_6: "Test 7",
					linkUrl_6: "#",
					imageUrl_7: "#",
					label_7: "Test 8",
					linkUrl_7: "#",
					imageUrl_8: "#",
					label_8: "Test 9",
					linkUrl_8: "#",
					imageUrl_9: "#",
					label_9: "Test 10",
					linkUrl_9: "#",
					imageUrl_10: "#",
					label_10: "Test 11",
					linkUrl_10: "#",
					imageUrl_11: "#",
					label_11: "Test 12",
					linkUrl_11: "#",
					imageUrl_12: "#",
					label_12: "Test Fail",
					linkUrl_12: "#",
				}}
			/>
		);
		expect(screen.queryByText("Test 1")).toBeInTheDocument();
		expect(screen.queryByText("Test 2")).toBeInTheDocument();
		expect(screen.queryByText("Test 3")).toBeInTheDocument();
		expect(screen.queryByText("Test 4")).toBeInTheDocument();
		expect(screen.queryByText("Test 5")).toBeInTheDocument();
		expect(screen.queryByText("Test 6")).toBeInTheDocument();
		expect(screen.queryByText("Test 7")).toBeInTheDocument();
		expect(screen.queryByText("Test 8")).toBeInTheDocument();
		expect(screen.queryByText("Test 9")).toBeInTheDocument();
		expect(screen.queryByText("Test 10")).toBeInTheDocument();
		expect(screen.queryByText("Test 11")).toBeInTheDocument();
		expect(screen.queryByText("Test 12")).toBeInTheDocument();
		expect(screen.queryByText("Test Fail")).not.toBeInTheDocument();
		unmount();
	});
});
