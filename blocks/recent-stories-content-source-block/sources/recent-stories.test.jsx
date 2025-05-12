import React from "react";
import { render } from "@testing-library/react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import RecentStoriesContentSource from "./recent-stories";

jest.mock("fusion:content", () => ({
  useContent: jest.fn(),
}));

jest.mock("fusion:context", () => ({
  useFusionContext: jest.fn(),
}));

describe("Recent Stories Content Source", () => {
  beforeEach(() => {
    useFusionContext.mockReturnValue({
      arcSite: "test-site",
    });

    useContent.mockReturnValue({
      content_elements: [
        {
          _id: "test-id-1",
          headlines: {
            basic: "Test Headline 1",
          },
          display_date: "2024-03-20T12:00:00.000Z",
        },
        {
          _id: "test-id-2",
          headlines: {
            basic: "Test Headline 2",
          },
          display_date: "2024-03-19T12:00:00.000Z",
        },
      ],
    });
  });

  it("should return content elements", () => {
    const { container } = render(<RecentStoriesContentSource />);
    expect(container).toBeTruthy();
  });

  it("should use the correct content source", () => {
    render(<RecentStoriesContentSource />);
    expect(useContent).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "recent-stories",
      })
    );
  });

  it("should use the correct query parameters", () => {
    render(<RecentStoriesContentSource />);
    expect(useContent).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          days: 7,
          feedSize: 10,
          feedOffset: 0,
        }),
      })
    );
  });

  it("should handle custom number of days", () => {
    render(<RecentStoriesContentSource days={14} />);
    expect(useContent).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          days: 14,
        }),
      })
    );
  });
}); 