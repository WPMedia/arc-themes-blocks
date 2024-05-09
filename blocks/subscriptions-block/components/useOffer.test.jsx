import {
	waitFor,
	renderHook
} from "@testing-library/react";
import "@testing-library/jest-dom";

import getProperties from "fusion:properties";

import useOffer from './useOffer';

jest.mock("fusion:context", () => ({
	__esModule: true,
	useFusionContext: () => ({
		arcSite: "Test Site",
	}),
}));

jest.mock('@wpmedia/arc-themes-components', () => ({
  isServerSide: jest.fn(() => false), // Mock isServerSide to return false
}));

describe('useOffer hook', () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Reset all mocks before each test
      });

  it('should fetch offer data successfully', async () => {
    getProperties.mockImplementation(() => ({
        api: {
            retail: {
              origin: 'https://example.com',
              endpoint: '/api/offers/',
            },
          },
    }));

    global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ offer: 'mocked_offer' }),
      });

    const { result } = renderHook(() => useOffer({ campaignCode: 'test' }));

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => expect(result.current.isFetching).toEqual(false));
    await waitFor(() => expect(result.current.error).toBe(null));
    await waitFor(() => expect(result.current.offer).toEqual({ offer: 'mocked_offer' }));
  });
});