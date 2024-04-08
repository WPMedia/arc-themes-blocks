import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { useSales, usePhrases } from "@wpmedia/arc-themes-components";
import BillingAddress from "./index";

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
  useSales: jest.fn(() => ({
    isInitialized: true,
      Sales: {
        getCart: jest.fn(async() => {})
      }
  })),
  usePhrases: jest.fn(() => ({
			t: jest.fn((phrase => phrase))
  }))
}));

describe('CheckoutCardDetail component', () => {
  it("renders billing address component",  async () => {
    render(
      <BillingAddress
        billingAddress={{}}
        setBillingAddress={jest.fn()}
        setIsOpen={jest.fn()}      
        setIsComplete={jest.fn()}
      />
    )
    expect(screen.getByText('checkout-block.address1')).toBeInTheDocument();
    expect(screen.getByText('checkout-block.address2')).toBeInTheDocument();
    expect(screen.getByText('checkout-block.country-region')).toBeInTheDocument();
    expect(screen.getByText('checkout-block.city')).toBeInTheDocument();
    expect(screen.getByText('checkout-block.state')).toBeInTheDocument();
    expect(screen.getByText('checkout-block.zip-code')).toBeInTheDocument();
  });
})