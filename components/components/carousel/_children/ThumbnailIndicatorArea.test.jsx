import { render, screen } from "@testing-library/react";
import ThumbnailIndicatorArea from "./ThumbnailIndicatorArea";

const DEFAULT_PROPS = {
	goToSlidePhrase: (targetSlide) => `Go to slide ${targetSlide}`,
	goToSlide: () => {},
};
describe("Thumbnail Indicator Area", () => {
	it("should call go to slide function if button is clicked showing the slide clicked for type thumbnail", () => {
		const goToSlide = jest.fn();
		const { container } = render(
			<ThumbnailIndicatorArea {...DEFAULT_PROPS} goToSlide={goToSlide}>
				<div key="1" />
				<div key="2" />
				<div key="3" />
			</ThumbnailIndicatorArea>
		);
		container.querySelectorAll(".c-carousel__indicator-thumbnail")[1].click();
		expect(goToSlide).toHaveBeenCalledWith(2);
	});
	it("should render thumbnail indicator as a child for a thumbnail", () => {
		render(
			<ThumbnailIndicatorArea {...DEFAULT_PROPS}>
				<div data-testid="test-child" />
			</ThumbnailIndicatorArea>
		);
		expect(screen.getAllByTestId("test-child").length).toBe(1);
	});

	it("should set the second slide to be active on the thumbnail type", () => {
		const scrollViewMock = jest.fn();
		window.HTMLElement.prototype.scrollIntoView = scrollViewMock;

		const { container } = render(
			<ThumbnailIndicatorArea {...DEFAULT_PROPS} currentSlideNumber={2}>
				<div data-testid="test-child-1" />
				<div data-testid="test-child-2" />
			</ThumbnailIndicatorArea>
		);

		const activeThumbnail = container.querySelector(".c-carousel__indicator-thumbnail--active");
		expect(activeThumbnail).not.toBeNull();

		// check that the scroll into view mock has been called
		expect(scrollViewMock).toHaveBeenCalled();

		expect(activeThumbnail.children[0].dataset.testid).toBe("test-child-2");
	});
});
