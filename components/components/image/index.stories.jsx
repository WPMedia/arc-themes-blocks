import Image from ".";

export default {
	title: "Components/Image",
	component: Image,
};

export const Default = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	),
};

export const ExternalUrl = {
	render: () => (
		<Image
			src="https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				auth: "f314a3f3b86665d1ef144a4a429324658d253fe5af94719822deee11be985738",
			}}
			responsiveImages={[100, 200, 1000, 1500]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					isDefault: true,
					sourceSizeValue: "200px",
				},
			]}
		/>
	),

	name: "External url",
};

export const ImageNotFound = {
	render: () => (
		<Image
			src="nowhere.jpg"
			alt="A person posing"
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	),

	name: "Image not found",
};

export const OnlyHeight = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	),

	name: "Only height",
};

export const OnlyWidth = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			width={300}
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	),

	name: "Only width",
};

export const ResponsiveImagesWithoutHeightAndWidth = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			responsiveImages={[100, 200, 1000]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					isDefault: true,
					sourceSizeValue: "1000px",
				},
				{
					mediaCondition: "(min-width: 1000px)",
					sourceSizeValue: "200px",
				},
			]}
		/>
	),

	name: "Responsive images without height and width",
};

export const ResponsiveImageWithResizedOptionsLikeLoweredQuality = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				quality: 10,
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			responsiveImages={[100, 200, 1000]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					isDefault: true,
					sourceSizeValue: "1000px",
				},
				{
					mediaCondition: "(min-width: 1000px)",
					sourceSizeValue: "200px",
				},
			]}
		/>
	),

	name: "Responsive image with resized options like lowered quality",
};

export const ResponsiveImageWithViewportWidthSizesFillingAboutHalfTheScreenWithVwOnDesktop = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				quality: 10,
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			responsiveImages={[100, 200, 1000, 1500]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					isDefault: true,
					sourceSizeValue: "25vw",
				},
				{
					mediaCondition: "(min-width: 500px)",
					sourceSizeValue: "40vw",
				},
			]}
		/>
	),

	name: "Responsive image with viewport width sizes, filling about half the screen with vw on desktop",
};

export const WidthAndHeight = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	),

	name: "Width and height",
};

export const WidthAndHeightAndManyResponsiveImages = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			responsiveImages={[100, 200, 1000]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					isDefault: true,
					sourceSizeValue: "1000px",
				},
				{
					mediaCondition: "(min-width: 1000px)",
					sourceSizeValue: "200px",
				},
			]}
		/>
	),

	name: "Width and height and many responsive images",
};

export const WidthAndHeightAndManyResponsiveImagesWithoutSizesDefault = {
	render: () => (
		<Image
			src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
			alt="A person posing"
			height={300}
			width={300}
			resizedOptions={{
				auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			}}
			responsiveImages={[100, 200, 1000]}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			sizes={[
				{
					mediaCondition: "(min-width: 1000px)",
					sourceSizeValue: "200px",
				},
			]}
		/>
	),

	name: "Width and height and many responsive images without sizes default",
};

export const WithoutAuthTokenRendersSrcRaw = {
	render: () => <Image src="computer-user.jpeg" alt="A person using a computer" />,
	name: "Without auth token renders src raw",
};
