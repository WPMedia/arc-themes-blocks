import React from "react";
import { render } from "@testing-library/react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import DeniseRodriguezContentSource from "./denise-rodriguez";

jest.mock("fusion:content", () => ({
  useContent: jest.fn(),
}));

jest.mock("fusion:context", () => ({
  useFusionContext: jest.fn(),
}));

describe("Denise Rodriguez Content Source", () => {
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
          credits: {
            by: [
              {
                name: "Denise Rodriguez",
                slug: "denise-rodriguez",
              },
            ],
          },
        },
        {
          _id: "test-id-2",
          headlines: {
            basic: "Test Headline 2",
          },
          credits: {
            by: [
              {
                name: "Denise Rodriguez",
                slug: "denise-rodriguez",
              },
            ],
          },
        },
      ],
    });
  });

  it("should return content elements", () => {
    const { container } = render(<DeniseRodriguezContentSource />);
    expect(container).toBeTruthy();
  });

  it("should use the correct content source", () => {
    render(<DeniseRodriguezContentSource />);
    expect(useContent).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "denise-rodriguez",
      })
    );
  });

  it("should use the correct query parameters", () => {
    render(<DeniseRodriguezContentSource />);
    expect(useContent).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          feedSize: 10,
          feedOffset: 0,
        }),
      })
    );
  });
}); 