import React from "react";
import { render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';

import CheckoutCardDetail from "./index";

describe('CheckoutCardDetail component', () => {
  
  it("summary is shown when card is open",  async () => {
    render(
      <CheckoutCardDetail
        type='Account'
        isOpen={true}
      >
        <p>Account placeholder</p>
      </CheckoutCardDetail>
    )
    expect(await screen.getByText('1. checkout-block.account')).toHaveTextContent('1. checkout-block.account');
    expect(await screen.getByText('Account placeholder')).toHaveTextContent('Account placeholder');
  });
  it("do not show summary if card is closed",  async () => {
    render(
      <CheckoutCardDetail
        type='Account'
        isOpen={false}
      >
        <p>Account placeholder</p>
      </CheckoutCardDetail>
    )
    expect(await screen.getByText('1. checkout-block.account')).toHaveTextContent('1. checkout-block.account');
    expect(await screen.queryByText('Account placeholder')).toBe(null);
  });
  it("renders billing address card",  async () => {
    render(
      <CheckoutCardDetail
        type='Billing Address'
        isOpen={true}
      >
      </CheckoutCardDetail>
    )
    expect(await screen.getByText('2. checkout-block.billingAddress')).toHaveTextContent('2. checkout-block.billingAddress');
  });
  it("renders payment card",  async () => {
    render(
      <CheckoutCardDetail
        type='Payment'
        isOpen={true}
      >
      </CheckoutCardDetail>
    )
    expect(await screen.getByText('3. checkout-block.payment')).toHaveTextContent('3. checkout-block.payment');
  });
  it("renders review card",  async () => {
    render(
      <CheckoutCardDetail
        type='Review'
        isOpen={true}
      >
      </CheckoutCardDetail>
    )
    expect(await screen.getByText('4. checkout-block.review')).toHaveTextContent('4. checkout-block.review');
  });
})