import {
	waitFor,
	renderHook
} from "@testing-library/react";
import "@testing-library/jest-dom";

const originalFetch = global.fetch;

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
        jest.clearAllMocks();
      });

    afterEach(() => {
        global.fetch = originalFetch;
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

  it('sets error when fetch fails', async () => {
    getProperties.mockImplementation(() => ({
      api: { retail: { origin: 'https://example.com', endpoint: '/api/offers/' } },
    }));
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useOffer({ campaignCode: 'test' }));
    await waitFor(() => expect(result.current.isFetching).toEqual(false));
    expect(result.current.error).toContain('Error in fetching retail offers');
  });

  it('sets error when origin is missing', async () => {
    getProperties.mockImplementation(() => ({
      api: { retail: { origin: null, endpoint: '/api/offers/' } },
    }));

    const { result } = renderHook(() => useOffer({ campaignCode: 'test' }));
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error).toContain('Origin or endpoint properties not set');
  });

  it('sets error when endpoint is missing', async () => {
    getProperties.mockImplementation(() => ({
      api: { retail: { origin: 'https://example.com', endpoint: null } },
    }));

    const { result } = renderHook(() => useOffer({ campaignCode: 'test' }));
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error).toContain('Origin or endpoint properties not set');
  });
});