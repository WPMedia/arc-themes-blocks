const React = require("react");

// Capture global Date before any local shadowing
const GlobalDate = global.Date;

const cx = (...classes) => classes.filter(Boolean).join(" ") || undefined;

const Heading = ({ children, className, dangerouslySetInnerHTML, ...rest }) =>
	dangerouslySetInnerHTML
		? React.createElement("h2", { className: cx("c-heading", className), dangerouslySetInnerHTML, ...rest })
		: React.createElement("h2", { className: cx("c-heading", className), ...rest }, children);

const HeadingSection = ({ children }) => React.createElement("div", null, children);

const Stack = ({ children, className, as: Tag = "div", ...rest }) =>
	React.createElement(Tag, { className, ...rest }, children);

const Grid = ({ children, className, as: Tag = "div", ...rest }) =>
	React.createElement(Tag, { className, ...rest }, children);

const Paragraph = ({ children, className, dangerouslySetInnerHTML, ...rest }) =>
	dangerouslySetInnerHTML
		? React.createElement("p", { className: cx("c-paragraph", className), dangerouslySetInnerHTML, ...rest })
		: React.createElement("p", { className: cx("c-paragraph", className), ...rest }, children);

const Link = ({ children, href, className, openInNewTab, assistiveHidden, ...rest }) => {
	if (assistiveHidden) {
		return React.createElement(
			"a",
			{ href, className: cx("c-link", className), "aria-hidden": "true", tabIndex: "-1", ...rest },
			children,
		);
	}
	const isExternal =
		openInNewTab || (href && (href.startsWith("http://") || href.startsWith("https://")));
	const targetProps = isExternal ? { target: "_blank", rel: "noreferrer" } : {};
	const newWindowLabel = isExternal
		? React.createElement("span", { className: "sr-only" }, " Opens in new window")
		: null;
	return React.createElement(
		"a",
		{ href, className: cx("c-link", className), ...targetProps, ...rest },
		children,
		newWindowLabel,
	);
};

const Image = ({
	src,
	alt,
	className,
	ansImage,
	resizerURL: resizerURLProp,
	resizedOptions,
	responsiveImages,
	width,
	height,
	aspectRatio,
	...rest
}) => {
	let resolvedSrc = src || ansImage?.url || ansImage?.src || "placeholder.jpg";
	let resolvedSrcSet;

	if (ansImage?.auth && width) {
		// ansImage path: Image builds the resizer URL internally using getProperties
		let baseURL = "";
		let tokenVersion = 2;
		try {
			// eslint-disable-next-line global-require
			const mod = require("fusion:properties");
			// Handle ES module default export interop
			// eslint-disable-next-line no-underscore-dangle
			const getProperties = mod.__esModule ? mod.default : mod;
			const props = typeof getProperties === "function" ? getProperties() : getProperties;
			baseURL = props?.resizerURL || "";
		} catch (e) {
			// fall through
		}
		try {
			// eslint-disable-next-line global-require
			const env = require("fusion:environment");
			// Named exports — available directly on the module object
			// eslint-disable-next-line no-underscore-dangle
			const envObj = env.__esModule ? env : env;
			tokenVersion = envObj.RESIZER_TOKEN_VERSION || 2;
		} catch (e) {
			// fall through
		}

		const authToken = ansImage.auth[tokenVersion];
		if (authToken && baseURL) {
			const imgUrl = ansImage.url;
			let calculatedHeight = height || width;
			if (aspectRatio) {
				const parts = aspectRatio.split(":").map(Number);
				if (parts.length === 2 && parts[0]) {
					calculatedHeight = Math.round((width * parts[1]) / parts[0]);
				}
			}
			resolvedSrc = `${baseURL}${imgUrl}?smart=true&auth=${authToken}&width=${width}&height=${calculatedHeight}`;

			if (responsiveImages?.length) {
				resolvedSrcSet = responsiveImages
					.map((w) => {
						const h = Math.round((w * calculatedHeight) / width);
						return `${baseURL}${imgUrl}?smart=true&auth=${authToken}&width=${w}&height=${h} ${w}w`;
					})
					.join(", ");
			}
		}
	} else if (resizerURLProp && resizedOptions?.auth && src && width && height) {
		// Pre-computed path (from getResizeParamsFromANSImage): resizerURL and src are separate props
		resolvedSrc = `${resizerURLProp}${src}?auth=${resizedOptions.auth}&width=${width}&height=${height}`;

		if (responsiveImages?.length) {
			resolvedSrcSet = responsiveImages
				.map((w) => {
					const h = Math.round((w * height) / width);
					return `${resizerURLProp}${src}?auth=${resizedOptions.auth}&width=${w}&height=${h} ${w}w`;
				})
				.join(", ");
		}
	}

	// alt=null → no alt attr (role "img"); alt=undefined → "" (role "presentation"); alt="text" → accessible
	const altAttr = alt === undefined ? "" : alt;
	return React.createElement("img", {
		src: resolvedSrc,
		...(resolvedSrcSet ? { srcSet: resolvedSrcSet } : {}),
		alt: altAttr,
		className,
		...rest,
	});
};

const Icon = ({ name, className }) =>
	React.createElement("span", { className: `icon-${name} ${className || ""}` });

const Join = ({ children, separator: SepComponent }) => {
	const childArray = React.Children.toArray(children).filter(Boolean);
	if (!childArray.length) return null;
	if (!SepComponent || childArray.length === 1) {
		return React.createElement(React.Fragment, null, ...childArray);
	}
	// Evaluate separator once — if it's a simple function returning a primitive, use the value directly
	// to avoid creating extra React element nodes that may affect RTL text matching
	let sepValue = null;
	try {
		const result = SepComponent({});
		if (typeof result === "string" || typeof result === "number") {
			sepValue = result;
		}
	} catch (e) {
		// not a simple function, use as component
	}

	const withSeparators = [];
	childArray.forEach((child, i) => {
		if (i > 0) {
			if (sepValue !== null) {
				withSeparators.push(sepValue);
			} else {
				// eslint-disable-next-line react/no-array-index-key
			withSeparators.push(React.createElement(SepComponent, { key: `sep-${i}` }));
			}
		}
		withSeparators.push(child);
	});
	return React.createElement(React.Fragment, null, ...withSeparators);
};

const MediaItem = ({ children, className, caption, credit, title }) =>
	React.createElement(
		"figure",
		{ className },
		children,
		title ? React.createElement("div", { className: "media-item-title" }, title) : null,
		caption ? React.createElement("figcaption", { className: "media-item-caption" }, caption) : null,
		credit ? React.createElement("span", { className: "media-item-credit" }, credit) : null,
	);

const Overline = ({ children, className, href, ...rest }) =>
	href
		? React.createElement("a", { className: cx("c-link", className), href, ...rest }, children)
		: React.createElement("span", { className: cx("c-link", className), ...rest }, children);

const LazyLoad = ({ children }) => React.createElement(React.Fragment, null, children);

const Conditional = ({ component: Component, condition, children, ...rest }) =>
	condition
		? React.createElement(Component, rest, children)
		: React.createElement(React.Fragment, null, children);

const Attribution = ({ children }) => React.createElement("span", null, children);

const Separator = (props) => React.createElement("hr", props);

// Named DateDisplay to avoid shadowing the global Date constructor in this module
const DateDisplay = ({ children, className, dateTime, dateString }) =>
	React.createElement("time", { className, dateTime }, dateString || children);

const Video = ({ children, className, ...rest }) =>
	React.createElement(
		"div",
		{ "data-testid": "video-container", className: cx("c-video__frame", className), ...rest },
		children,
	);

const Button = ({
	children,
	className,
	onClick,
	type,
	label,
	href,
	variant,
	size,
	"aria-label": ariaLabel,
	accessibilityLabel,
	assistiveHidden,
	...rest
}) => {
	const variantClass = variant ? `c-button--${variant}` : null;
	const sizeClass = size ? `c-button--${size}` : null;
	const combinedClass = cx("c-button", variantClass, sizeClass, className);
	const ariaLabelAttr = ariaLabel || accessibilityLabel || label;

	if (href) {
		const isExternal = href.startsWith("http://") || href.startsWith("https://");
		const targetProps = isExternal ? { target: "_blank", rel: "noreferrer" } : {};
		const newWindowLabel =
			isExternal && !assistiveHidden
				? React.createElement("span", { className: "sr-only" }, " Opens in new window")
				: null;
		return React.createElement(
			"a",
			{ href, className: combinedClass, "aria-label": ariaLabelAttr, ...targetProps, ...rest },
			children,
			newWindowLabel,
		);
	}

	return React.createElement(
		"button",
		{
			className: combinedClass,
			onClick,
			type, // eslint-disable-line react/button-has-type
			"aria-label": ariaLabelAttr,
			...rest,
		},
		children,
	);
};

const Badge = ({ children, className }) => React.createElement("span", { className }, children);

const BotChallengeProtection = () => null;

const Details = ({ children, className, summary }) =>
	React.createElement(
		"details",
		{ className },
		React.createElement("summary", null, summary),
		children,
	);

const Divider = ({ className }) => React.createElement("hr", { className });

const Input = ({
	className,
	id,
	label,
	name,
	type = "text",
	value,
	onChange,
	tip,
	validationErrorMessage,
	showDefaultError,
	validationPattern,
	onBlur,
	...rest
}) => {
	const [hasError, setHasError] = React.useState(!!showDefaultError);
	const [currentValue, setCurrentValue] = React.useState(value || "");
	const inputId = id || name;

	const valueRef = React.useRef(value || "");

	const handleChange = (e) => {
		const newVal = e.target.value;
		valueRef.current = newVal;
		setCurrentValue(newVal);
		if (onChange) onChange({ value: newVal });
	};

	const handleBlur = (e) => {
		if (validationPattern) {
			// HTML pattern attribute matches the whole value (anchored)
			const regex = new RegExp(`^(?:${validationPattern})$`);
			if (!regex.test(valueRef.current)) setHasError(true);
		} else if (validationErrorMessage) {
			setHasError(true);
		}
		if (onBlur) onBlur(e);
	};

	const showError = showDefaultError || hasError;

	return React.createElement(
		"div",
		{ className },
		React.createElement("label", { htmlFor: inputId }, label),
		React.createElement("input", {
			id: inputId,
			name,
			type,
			value: currentValue,
			onChange: handleChange,
			onBlur: handleBlur,
			pattern: validationPattern,
			...rest,
		}),
		tip ? React.createElement("p", { className: "c-input__tip" }, tip) : null,
		showError && validationErrorMessage
			? React.createElement("p", { className: "c-input__error", role: "alert" }, validationErrorMessage)
			: null,
	);
};

const MetaData = () => null;

const Pill = ({ children, className, href, ...rest }) =>
	href
		? React.createElement("a", { className: cx("c-pill", className), href, ...rest }, children)
		: React.createElement("span", { className: cx("c-pill", className), ...rest }, children);

// Carousel with sub-components
function CarouselItem({ children, className, label }) {
	// Support render prop pattern: children can be a function ({ viewable }) => JSX
	const content = typeof children === "function" ? children({ viewable: true }) : children;
	return React.createElement(
		"div",
		{ className: cx("c-carousel__slide", className), role: "group", "aria-label": label },
		content,
	);
}
function CarouselButton({ children, className, label }) {
	return React.createElement("button", { type: "button", className: cx("c-carousel__button", className), "aria-label": label }, children);
}
function Carousel({ children, className, label }) {
	return React.createElement(
		"div",
		{ className: cx("c-carousel", className), role: "region", "aria-label": label },
		children,
	);
}
Carousel.Item = CarouselItem;
Carousel.Button = CarouselButton;

// Picture with sub-components
function PictureSource(props) {
	return React.createElement("source", props);
}
function PictureImage({ src, alt, className, ansImage, ...rest }) {
	const resolvedSrc = src || ansImage?.url || ansImage?.src || "placeholder.jpg";
	const altAttr = alt === undefined ? "" : alt;
	return React.createElement("img", { src: resolvedSrc, alt: altAttr, className, ...rest });
}
function Picture({ children, className }) {
	return React.createElement("picture", { className }, children);
}
Picture.Source = PictureSource;
Picture.Image = PictureImage;

// Price with sub-components
function PriceSale({ children, className, ...rest }) {
	return React.createElement("span", { className, ...rest }, children);
}
function PriceList({ children, className, ...rest }) {
	return React.createElement("span", { className, ...rest }, children);
}
function Price({ children, className, ...rest }) {
	return React.createElement("div", { className, "data-testid": "price", ...rest }, children);
}
Price.Sale = PriceSale;
Price.List = PriceList;

const salesMock = {
	clearCart: jest.fn(() => Promise.resolve()),
	addItemToCart: jest.fn(() => Promise.resolve()),
	getCart: jest.fn(() => Promise.resolve({})),
	getOrderDetails: jest.fn(() => Promise.resolve({})),
	getOrderHistory: jest.fn(() => Promise.resolve([])),
	getPaymentOptions: jest.fn(() => Promise.resolve([])),
	initializePayment: jest.fn(() => Promise.resolve({})),
	initializePaymentUpdate: jest.fn(() => Promise.resolve({})),
	finalizePayment: jest.fn(() => Promise.resolve({})),
	finalizePaymentUpdate: jest.fn(() => Promise.resolve({})),
	createNewOrder: jest.fn(() => Promise.resolve({})),
	cancelSubscription: jest.fn(() => Promise.resolve()),
	rescueSubscription: jest.fn(() => Promise.resolve()),
	currentOrder: null,
	options: {},
	apiOrigin: "",
};

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const getTZDate = (date, timeZone) => {
	try {
		// Get date parts in the requested timezone
		const parts = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
			timeZone: timeZone || "UTC",
			timeZoneName: "short",
		}).formatToParts(date);
		const get = (type) => parts.find((p) => p.type === type)?.value || "";
		return {
			month: parseInt(get("month"), 10) - 1,
			day: parseInt(get("day"), 10),
			year: parseInt(get("year"), 10),
			hour: parseInt(get("hour"), 10),
			minute: get("minute"),
			ampm: get("dayPeriod") || get("period") || "",
			tz: get("timeZoneName") || timeZone || "UTC",
		};
	} catch (e) {
		return null;
	}
};

const localizeDateTime = (date, dateTimeFormat, language, timeZone) => {
	if (!date) return "";
	try {
		const d = date instanceof GlobalDate ? date : new GlobalDate(date);
		const parts = getTZDate(d, timeZone || "UTC");
		if (!parts) return d.toDateString();
		const { month, day, year, hour, minute, ampm, tz } = parts;
		const monthName = MONTHS[month];
		const paddedDay = String(day).padStart(2, "0");
		const ampmClean = ampm.replace(/\./g, "").toUpperCase();
		return `${monthName} ${paddedDay}, ${year} at ${hour}:${minute}${ampmClean} ${tz}`;
	} catch (e) {
		return new GlobalDate(date).toDateString();
	}
};

const localizeDate = (date, dateTimeFormat, language, timeZone) => {
	if (!date) return "";
	try {
		const d = date instanceof GlobalDate ? date : new GlobalDate(date);
		const parts = getTZDate(d, timeZone || "UTC");
		if (!parts) return d.toDateString();
		const { month, day, year } = parts;
		return `${MONTHS[month]} ${String(day).padStart(2, "0")}, ${year}`;
	} catch (e) {
		return new GlobalDate(date).toDateString();
	}
};
const formatURL = (url) => url || "";
const getFocalFromANS = (image) => image?.focal_point || null;
const getImageFromANS = (content) => {
	if (!content) return null;
	const basic = content.promo_items?.basic;
	if (basic?.type === "image" || basic?.url) return basic;
	if (content.url && content.type === "image") return content;
	const authorImage = content.credits?.by?.[0]?.image;
	if (authorImage?.url) return authorImage;
	return null;
};
const getManualImageID = (url, resizedImage) => {
	if (!url) return null;
	if (resizedImage) return null;
	const match = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
	return match ? match[1] : null;
};
const getVideoFromANS = (content) => {
	const leadArt = content?.promo_items?.lead_art;
	if (leadArt?.type === "video") return leadArt.embed_html || leadArt;
	if (content?.type === "video") return content.embed_html || content;
	return null;
};
const isServerSide = () => false;
const formatAuthors = (authors, andText) => {
	if (!authors || !authors.length) return null;
	const sep = andText || "and";
	const authorItems = authors
		.map((author) => {
			const name =
				author?.additional_properties?.original?.byline || author?.name || "";
			if (!name) return null;
			const url = author?.url || author?.bio_page || null;
			return { name, url };
		})
		.filter(Boolean);
	if (!authorItems.length) return null;

	const hasLinks = authorItems.some((a) => a.url);

	if (!hasLinks) {
		// All plain text — return a simple string for RTL text matching compatibility
		if (authorItems.length === 1) return authorItems[0].name;
		const names = authorItems.map((a) => a.name);
		const last = names.pop();
		return `${names.join(", ")}, ${sep} ${last}`;
	}

	// Mix of links and plain text — build React elements
	const parts = [];
	authorItems.forEach((author, i) => {
		if (i > 0) {
			if (i < authorItems.length - 1) {
				parts.push(", ");
			} else {
				parts.push(`, ${sep} `);
			}
		}
		if (author.url) {
			parts.push(
				React.createElement("a", { key: author.name, href: author.url, className: "c-link" }, author.name),
			);
		} else {
			parts.push(author.name);
		}
	});
	return parts;
};
const formatCredits = (credits) => {
	const byList = credits?.by || (Array.isArray(credits) ? credits : []);
	const affiliationList = credits?.affiliation || [];
	const allItems = [...byList, ...affiliationList];
	if (!allItems.length) return null;
	const names = allItems.map((c) => (c && c.name ? c.name : "")).filter(Boolean);
	if (!names.length) return null;
	return `(${names.join("/")})`;
};
const formatPowaVideoEmbed = () => null;
const formatSocialURL = (site, url) => {
	if (!url) return "";
	if (site && site.toLowerCase() === "email" && !url.startsWith("mailto:")) {
		return `mailto:${url}`;
	}
	return url;
};
const getPromoType = () => null;
const imageANSToImageSrc = (image) => {
	if (!image) return null;
	if (image._id) return `${image._id}.jpg`;
	if (image.url) return image.url;
	return null;
};
const useIdentity = () => ({});
const usePhrases = () => {
	try {
		// Use fusion:intl when available so tests that mock fusion:intl get proper translations
		// eslint-disable-next-line global-require
		const getIntl = require("fusion:intl");
		const intl = typeof getIntl === "function" ? getIntl("en") : getIntl?.default?.("en");
		if (intl && typeof intl.t === "function") return intl;
	} catch (e) {
		// fusion:intl not available, fall back to key passthrough
	}
	return { t: (key) => key };
};
const useSales = () => ({ Sales: salesMock });
const useRecaptcha = () => ({ isRecaptchaEnabled: false });

module.exports = {
	Attribution,
	Badge,
	BotChallengeProtection,
	Button,
	Carousel,
	Conditional,
	Date: DateDisplay,
	Details,
	Divider,
	formatAuthors,
	formatCredits,
	formatPowaVideoEmbed,
	formatSocialURL,
	formatURL,
	getFocalFromANS,
	getImageFromANS,
	getManualImageID,
	getPromoType,
	getVideoFromANS,
	Grid,
	Heading,
	HeadingSection,
	Icon,
	Image,
	imageANSToImageSrc,
	Input,
	isServerSide,
	Join,
	LazyLoad,
	Link,
	localizeDate,
	localizeDateTime,
	MediaItem,
	MetaData,
	Overline,
	Paragraph,
	Picture,
	Pill,
	Price,
	Separator,
	Stack,
	useIdentity,
	usePhrases,
	useRecaptcha,
	useSales,
	Video,
};
