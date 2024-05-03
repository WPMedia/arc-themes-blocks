import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderInformation from "./index";

describe("OrderInformation component", () => {
	it.only("renders the orderInformation component", () => {
        
        jest.mock('../OfferCard', () => MockOfferCard)

		render(
			<OfferToProductList
				isLoggedIn
				loginURL="/login/"
				checkoutURL="/checkout/"
				offer={sampleOffer}
			/>
		);

        expect(screen.getAllByTestId('offer-card-mock')).toHaveLength(4);
	});
});