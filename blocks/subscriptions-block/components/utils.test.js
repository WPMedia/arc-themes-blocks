import React from "react";
import "@testing-library/jest-dom";

import { durationInMillis, getCyclesCurrentRate, getNextRate } from "./utils";

describe("utils", () => {
	it("durationInMillis", () => {
		expect(durationInMillis('Day')).toBe(86400000)
		expect(durationInMillis('Week')).toBe(604800000)
		expect(durationInMillis('Month')).toBe(2592000000)
		expect(durationInMillis('Year')).toBe(31104000000)
		expect(durationInMillis('')).toBe(0)
	});

  it('getCyclesCurrentRate', () => {
    const rate = {
      duration: 'Month',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 10
    }
    const expectResult = [{"amount": 10, "billingCount": 1, "billingFrequency": "Month", "duration": "Month", "durationCount": 1, "endTime": 2592000000, "startTime": 1}]
    expect(getCyclesCurrentRate(rate)).toEqual(expectResult)
  })

  it('getNextRate', () => {
    const price = {
      rates: [
          {
              "createdOn": 1713561558000,
              "createdBy": null,
              "modifiedOn": 1713561558000,
              "modifiedBy": null,
              "deletedOn": null,
              "id": 5909,
              "amount": "5.00",
              "billingCount": 1,
              "billingFrequency": "Month",
              "durationCount": 36,
              "duration": "Month",
              "taxInclusive": true
          }
      ],
  }
    const expectResult = {"amount": "5.00", "billingCount": 1, "billingFrequency": "Month", "duration": "Month", "durationCount": 36, "endTime": 5184000000, "startTime": 2592000001};
    expect(getNextRate(1, price)).toEqual(expectResult)
  })
});
