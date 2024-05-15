import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import BillingAddress from "./index";

jest.mock("fusion:properties", () =>
	jest.fn(() => ({
		api: {
			identity: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
			},
			retail: {
				origin: "https://corecomponents-arc-demo-3-prod.api.cdn.arcpublishing.com",
				endpoint: "/retail/public/v1/offer/live/",
			},
		},
	})),
);

jest.mock("@wpmedia/arc-themes-components", () => {
  const createOrderMock = jest.fn(() => Promise.resolve());

  return {
    ...jest.requireActual("@wpmedia/arc-themes-components"),
    useSales: jest.fn(() => ({
      isInitialized: true,
      Sales: {
        getCart: jest.fn(async() => {}),
        createOrder: createOrderMock
      }
    })),
    usePhrases: jest.fn(() => ({
      t: jest.fn((phrase) => phrase)
    })),
    Stack: ({ children }) => <div>{children}</div>,
    Input: ({ key, name, label }) => <><input key={key} id={name} name={name} /> <label name="name" htmlFor={name}>{label}</label></>,
    Button: ({ onClick, actionText, ariaLabel }) => <button type="submit" onClick={onClick} aria-label={ariaLabel}><span dangerouslySetInnerHTML={{ __html: actionText }} /></button>,
  };
});

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

  it("Submit the form with valid data", async()=>{
    render(
      <BillingAddress
        user = {{email: 'jhondoe@gmail.com'}}
        billingAddress={{}}
        setBillingAddress={jest.fn()}
        setIsOpen={jest.fn()}      
        setIsComplete={jest.fn()}
        setResetRecaptcha={jest.fn()}
        setError={jest.fn()}
      />
    )

    fireEvent.change(screen.getByLabelText('checkout-block.address1'), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText('checkout-block.address2'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('checkout-block.country-region'), { target: { value: 'US' } });
    fireEvent.change(screen.getByLabelText('checkout-block.city'), { target: { value: 'Brooklyn' } });
    fireEvent.change(screen.getByLabelText('checkout-block.state'), { target: { value: 'NY' } });
    fireEvent.change(screen.getByLabelText('checkout-block.zip-code'), { target: { value: '10001' } });

    fireEvent.click(screen.getByRole('button'));
  })
})