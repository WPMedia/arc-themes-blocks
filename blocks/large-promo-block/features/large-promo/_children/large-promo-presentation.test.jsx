import React from "react";
import { render } from "@testing-library/react";
import LargePromoPresentation from "./large-promo-presentation";
import "@testing-library/jest-dom/extend-expect";

const IMAGE_OVERRIDE_URL = "http://arcxp.com/image-override-url.jpg";

describe("LargePromoPresentation", () => {
	it("should render the image override url shown and show image enabled", () => {
		const { container } = render(
			<LargePromoPresentation showImage imageOverrideURL={IMAGE_OVERRIDE_URL} />
		);

		expect(container.getElementsByClassName("c-image").length).toBe(1);
		// may need to be less specific about implementation here
		expect(container.getElementsByClassName("c-image").item(0).src).toBe(IMAGE_OVERRIDE_URL);
	});

	it("should not render the large promo with show image disabled", () => {
		const { container } = render(<LargePromoPresentation showImage={false} />);
		expect(container.getElementsByClassName("c-image").length).toBe(0);
	});

	it("should render image content if it has an image", () => {
		const { container } = render(
			<LargePromoPresentation
				showImage
				content={{
					promo_items: {
						basic: {
							url: "https://arcxp.com/content-image.jpg",
							type: "image",
						},
					},
				}}
			/>
		);

		expect(container.getElementsByClassName("c-image").length).toBe(1);
		// may need to be less specific about implementation here
		expect(container.getElementsByClassName("c-image").item(0).src).toBe(
			"https://arcxp.com/content-image.jpg"
		);
	});
});
