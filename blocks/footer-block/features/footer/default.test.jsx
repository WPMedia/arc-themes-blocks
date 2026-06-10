/* @jest-environment jsdom */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import getProperties from "fusion:properties";
import { isServerSide } from "@wpmedia/arc-themes-components";
import Footer from "./default";

// Mocks
jest.mock("fusion:context", () => ({
  useFusionContext: jest.fn(),
}));

jest.mock("fusion:content", () => ({
  useContent: jest.fn(),
}));

jest.mock("fusion:properties", () => jest.fn());

// Lightweight component mocks to keep DOM simple and assertable
jest.mock("@wpmedia/arc-themes-components", () => ({
    Grid: ({ children, className }) => (
      <div data-testid="Grid" className={className}>
        {children}
      </div>
    ),
    Heading: ({ children }) => <h2>{children}</h2>,
    HeadingSection: ({ children }) => <section data-testid="HeadingSection">{children}</section>,
    isServerSide: jest.fn(),
    Icon: ({ name }) => <i data-testid="Icon" data-icon={name} />,
    Image: ({ alt, src, className, height }) => (
      <img alt={alt} src={src} className={className} data-height={height} />
    ),
    LazyLoad: ({ enabled, children }) => (
      <div data-testid="LazyLoad" data-enabled={String(enabled)}>
        {children}
      </div>
    ),
    Link: ({ href, children, supplementalText }) => (
      <a href={href} data-supplemental-text={supplementalText}>
        {children}
      </a>
    ),
    MediaItem: ({ children }) => <figure data-testid="MediaItem">{children}</figure>,
    Paragraph: ({ children }) => <p>{children}</p>,
    Stack: ({ children, className, direction, id }) => (
      <div id={id} className={className} data-direction={direction || ""}>
        {children}
      </div>
    ),
  usePhrases: () => ({ t: (k) => `T:${k}` }),
}));

// Reusable helpers
const makeProps = (overrides = {}) => ({
  customFields: {
    navigationConfig: {
      contentService: "navigation",
      contentConfigValues: { foo: "bar" },
    },
    lazyLoad: false,
    ...overrides.customFields,
  },
});

const baseProperties = {
  facebookPage: undefined,
  twitterUsername: undefined,
  rssUrl: undefined,
  copyrightText: "© 2025",
  lightBackgroundLogo: undefined,
  lightBackgroundLogoAlt: "Light Alt",
  primaryLogo: undefined,
  primaryLogoAlt: "Primary Alt",
};

const setup = ({
  isAdmin = false,
  serverSide = false,
  props = makeProps(),
  properties = {},
  content = { children: [] },
  pagebuilderURLImpl = (p) => p,
} = {}) => {
  const pagebuilderURL = jest.fn(pagebuilderURLImpl);

  getProperties.mockReturnValue({ ...baseProperties, ...properties });

  useFusionContext.mockReturnValue({
    arcSite: "the-site",
    contextPath: "/pf",
    isAdmin,
    pagebuilderURL,
  });

  isServerSide.mockReturnValue(serverSide);
  useContent.mockReturnValue(content);

  const utils = render(<Footer {...props} />);
  return { ...utils, pagebuilderURL };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("Footer", () => {
  test("returns null on server when lazyLoad is true and user is not admin", () => {
    setup({
      serverSide: true,
      isAdmin: false,
      props: makeProps({ customFields: { lazyLoad: true } }),
    });
    expect(isServerSide).toHaveBeenCalled();
    expect(screen.queryByTestId("LazyLoad")).toBeNull();
  });

  test("renders with LazyLoad enabled on client when lazyLoad is true", () => {
    setup({
      serverSide: false,
      isAdmin: false,
      props: makeProps({ customFields: { lazyLoad: true } }),
    });
  const wrapper = screen.getByTestId("LazyLoad");
  expect(wrapper).toBeInTheDocument();
  expect(wrapper).toHaveAttribute("data-enabled", "true");
  // Renders footer content
  expect(screen.getByText("© 2025")).toBeInTheDocument();
  });

  test("renders for admins even on server and disables LazyLoad", () => {
    setup({
      serverSide: true,
      isAdmin: true,
      props: makeProps({ customFields: { lazyLoad: true } }),
    });
  const wrapper = screen.getByTestId("LazyLoad");
  expect(wrapper).toHaveAttribute("data-enabled", "false");
  expect(screen.getByText("© 2025")).toBeInTheDocument();
  });
});

describe("FooterItem", () => {
  test("renders social links when configured and uses phrases for supplemental text", () => {
    setup({
      properties: {
        facebookPage: "https://facebook.com/theSite",
        twitterUsername: "theUser",
        rssUrl: "/rss.xml",
      },
    });

  // Facebook (icon-only link; select via href attribute)
  const allLinks = screen.getAllByRole("link");
  const fb = allLinks.find((a) => a.getAttribute("href") === "https://facebook.com/theSite");
  expect(fb).toBeInTheDocument();
  expect(fb).toHaveAttribute("data-supplemental-text", "T:footer-block.facebook-link");

  // Twitter (select via href attribute)
  const twitter = allLinks.find((a) => a.getAttribute("href") === "https://twitter.com/theUser");
  expect(twitter).toBeInTheDocument();
  expect(twitter).toHaveAttribute("data-supplemental-text", "T:footer-block.twitter-link");

  // RSS (select via href attribute)
  const rss = allLinks.find((a) => a.getAttribute("href") === "/rss.xml");
  expect(rss).toBeInTheDocument();
  expect(rss).toHaveAttribute("data-supplemental-text", "T:footer-block.rss-link");

    // Copyright always renders
    expect(screen.getByText("© 2025")).toBeInTheDocument();
  });

  test("does not render social links section when none provided", () => {
    setup();
    // No links should render when no social config and no nav content
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  test("renders navigation grid with both link and non-link items; skips empty columns", () => {
    setup({
      content: {
        children: [
          {
            _id: "col-1",
            name: "Column 1",
            children: [
              {
                _id: "i-1",
                node_type: "link",
                display_name: "Foo",
                url: "/foo",
              },
              {
                _id: "/tag2",
                node_type: "collection",
                name: "Bar",
              },
            ],
          },
          {
            _id: "col-empty",
            name: "Empty Column",
            children: [],
          },
          {
            _id: "col-noname",
            children: [{ _id: "i-3", node_type: "link", display_name: "Baz", url: "/baz" }],
          },
        ],
      },
    });

    // Grid exists
    expect(screen.getByTestId("Grid")).toBeInTheDocument();

    // Column 1 heading
    expect(screen.getByRole("heading", { level: 2, name: "Column 1" })).toBeInTheDocument();

    // Link item
    expect(screen.getByRole("link", { name: "Foo" })).toHaveAttribute("href", "/foo");

    // Non-link item
    expect(screen.getByRole("link", { name: "Bar" })).toHaveAttribute("href", "/tag2");

    // Column without children is skipped (no "Empty Column" heading)
    expect(screen.queryByRole("heading", { name: "Empty Column" })).toBeNull();

    // Column with no name still renders its list
    expect(screen.getByRole("link", { name: "Baz" })).toHaveAttribute("href", "/baz");
  });

  test("computes logo URL with pagebuilderURL for relative primaryLogo; uses primary alt", () => {
    const { pagebuilderURL } = setup({
      properties: {
        primaryLogo: "resources/logo.png",
        primaryLogoAlt: "Primary Alt",
      },
      pagebuilderURLImpl: (p) => `BUILT:${p}`,
    });

    const img = screen.getByRole("img", { name: "Primary Alt" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "BUILT:/pf/resources/logo.png");
    expect(img).toHaveAttribute("data-height", "64");
    expect(pagebuilderURL).toHaveBeenCalledWith("/pf/resources/logo.png");
  });

  test("uses absolute lightBackgroundLogo without calling pagebuilderURL; uses light alt", () => {
    const { pagebuilderURL } = setup({
      properties: {
        lightBackgroundLogo: "http://cdn.example.com/logo.png",
        lightBackgroundLogoAlt: "Light Alt CDN",
        primaryLogo: "resources/ignored.png",
        primaryLogoAlt: "Primary Alt",
      },
    });

    const img = screen.getByRole("img", { name: "Light Alt CDN" });
    expect(img).toHaveAttribute("src", "http://cdn.example.com/logo.png");
    expect(pagebuilderURL).not.toHaveBeenCalled();
  });

  test("uses base64 logo without calling pagebuilderURL", () => {
    const { pagebuilderURL } = setup({
      properties: {
        lightBackgroundLogo: "base64ABC123",
        lightBackgroundLogoAlt: "Base64 Alt",
      },
    });

    const img = screen.getByRole("img", { name: "Base64 Alt" });
    expect(img).toHaveAttribute("src", "base64ABC123");
    expect(pagebuilderURL).not.toHaveBeenCalled();
  });

  test("does not render navigation when content has no children; still renders copyright and trailing div", () => {
    setup({ content: undefined });
    expect(screen.queryByTestId("Grid")).toBeNull();
    expect(screen.getByText("© 2025")).toBeInTheDocument();
  // implicit: footer rendered
  expect(screen.getByText("© 2025")).toBeInTheDocument();
  });

  test("renders only facebook link when only facebookPage is provided", () => {
    setup({
      properties: {
        facebookPage: "https://facebook.com/only",
      },
    });
    const allLinks = screen.getAllByRole("link");
    expect(allLinks).toHaveLength(1);
    expect(allLinks[0]).toHaveAttribute("href", "https://facebook.com/only");
    // Twitter and RSS icons not present
    expect(screen.queryByTestId("Icon[data-icon='Twitter']")).toBeNull();
  });

  test("renders only twitter link when only twitterUsername is provided", () => {
    setup({
      properties: {
        twitterUsername: "onlytwitter",
      },
    });
    const allLinks = screen.getAllByRole("link");
    expect(allLinks).toHaveLength(1);
    expect(allLinks[0]).toHaveAttribute("href", "https://twitter.com/onlytwitter");
  });

  test("renders only rss link when only rssUrl is provided", () => {
    setup({
      properties: {
        rssUrl: "/feed.xml",
      },
    });
    const allLinks = screen.getAllByRole("link");
    expect(allLinks).toHaveLength(1);
    expect(allLinks[0]).toHaveAttribute("href", "/feed.xml");
  });

  test("uses empty string alt when lightBackgroundLogo used but no alt provided", () => {
    const { container } = setup({
      properties: {
        lightBackgroundLogo: "http://cdn.example.com/logo.png",
        // lightBackgroundLogoAlt deliberately absent → falls back to || ""
        lightBackgroundLogoAlt: undefined,
        primaryLogoAlt: undefined,
      },
    });
    // An img with empty alt gets role="presentation" in ARIA, so query by class
    const img = container.querySelector(".b-footer__logo");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "http://cdn.example.com/logo.png");
    expect(img).toHaveAttribute("alt", "");
  });

  test("calls useContent with expected params (service, merged query, filter)", () => {
    setup({
      props: makeProps({
        customFields: {
          navigationConfig: {
            contentService: "nav-service",
            contentConfigValues: { region: "us", foo: "baz" },
          },
        },
      }),
    });

    expect(useContent).toHaveBeenCalledTimes(1);
    const arg = useContent.mock.calls[0][0];

    expect(arg.source).toBe("nav-service");
    expect(arg.query).toEqual(
      expect.objectContaining({
        hierarchy: "footer",
        feature: "footer",
        region: "us",
        foo: "baz",
      })
    );
    expect(typeof arg.filter).toBe("string");
    expect(arg.filter).toContain("children");
  });
});