import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import { useSales, usePhrases } from "@wpmedia/arc-themes-components";
import BillingAddress from "./index";

jest.mock("@wpmedia/arc-themes-components");

describe('CheckoutCardDetail component', () => {

  it("redners billing address component",  async () => {
    useSales.mockImplementation(() => ({
      isInitialized: true,
      Sales: {
        getCart: jest.fn(async() => {})
      }
    }));

    usePhrases.mockImplementation(() => ({
			t: jest.fn((phrase => phrase))
		}))

    render(
      <BillingAddress
        billingAddress={{}}
        setBillingAddress={jest.fn()}
        setIsOpen={jest.fn()}
        setIsComplete={jest.fn()}
      />
    )
    expect(screen.getByTestId('billing-address')).toBeInTheDocument();
  });
})