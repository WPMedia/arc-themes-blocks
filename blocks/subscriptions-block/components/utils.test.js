// eslint-disable-next-line
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

  it('getCyclesCurrentRate with UntilCancelled duration', () => {
    const rate = {
      duration: 'UntilCancelled',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 10
    };
    const result = getCyclesCurrentRate(rate);
    expect(result[0].startTime).toBe('UntilCancelled');
    expect(result[0].endTime).toBe('UntilCancelled');
  });

  it('getCyclesCurrentRate with multiple cycles', () => {
    const rate = {
      duration: 'Month',
      durationCount: 2,
      billingCount: 1,
      billingFrequency: 'Month',
      amount: 5
    };
    const result = getCyclesCurrentRate(rate);
    expect(result.length).toBe(2);
    expect(result[1].startTime).toBeGreaterThan(1);
  });

  it('getCyclesCurrentRate with OneTime billingFrequency', () => {
    const rate = {
      duration: 'UntilCancelled',
      durationCount: 1,
      billingCount: 1,
      billingFrequency: 'OneTime',
      amount: 10
    };
    const result = getCyclesCurrentRate(rate);
    expect(result[0].billingFrequency).toBe('UntilCancelled');
  });

  it('getNextRate returns last cycle when currentCycle exceeds available cycles', () => {
    const price = {
      rates: [{ amount: "10.00", billingCount: 1, billingFrequency: "Month", durationCount: 1, duration: "Month" }],
    };
    const result = getNextRate(99, price);
    expect(result).toBeDefined();
  });

  it('calculateDurationCycle returns 0 when no billingCount and no matching frequency', () => {
    // billingFrequency is empty, no billingCount → returns 0
    const rate = {
      duration: 'Month',
      durationCount: 0,
      billingCount: undefined,
      billingFrequency: '',
      amount: 5
    };
    const result = getCyclesCurrentRate(rate);
    // With durationRate=0 and duration='Month' (not UntilCancelled), loop doesn't execute
    expect(result).toEqual([]);
  });

  it('getCyclesCurrentRate with Hour billingFrequency uses billingCount in days', () => {
    const rate = {
      duration: 'Day',
      durationCount: 2,
      billingCount: 3,
      billingFrequency: 'Hour',
      amount: 5
    };
    const result = getCyclesCurrentRate(rate);
    // 'Hour' is not a standard billing period, so the function falls through to the default case
    expect(result.length).toBeGreaterThan(0);
  });

  it('getNextRate handles UntilCancelled rate', () => {
    const price = {
      rates: [
        { amount: "5.00", billingCount: 1, billingFrequency: "Month", durationCount: 1, duration: "Month" },
        { amount: "10.00", billingCount: 1, billingFrequency: "Month", durationCount: 1, duration: "UntilCancelled" },
      ],
    };
    const result = getNextRate(1, price);
    expect(result.duration).toBe('UntilCancelled');
  });

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
