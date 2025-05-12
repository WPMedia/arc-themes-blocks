import Picture from ".";

export default {
	title: "Components/Picture",
	component: Picture,

	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

export const DefaultPicture = {
	render: () => (
		<Picture>
			<Picture.Source
				src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
				media="(min-width: 768px)"
				height={1000}
				width={1800}
				resizedOptions={{
					auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
					smart: true,
					quality: 80,
				}}
				resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			/>
			<Picture.Source
				src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
				media="(min-width: 400px)"
				height={1000}
				width={1000}
				resizedOptions={{
					auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
					smart: true,
					quality: 75,
				}}
				resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			/>
			<Picture.Image
				src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
				height={1500}
				width={999}
				alt="A person posing"
				resizedOptions={{
					auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
					smart: true,
					quality: 70,
				}}
				resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			/>
		</Picture>
	),

	name: "Picture",
};

export const PictureSourceDoesNotRenderWithoutAMediaAttribute = {
	render: () => (
		<Picture>
			<Picture.Source
				src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
				height={999}
				width={1500}
				resizedOptions={{
					auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
				}}
				resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			/>
			<Picture.Image
				src="HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg"
				alt="A person posing"
				height={400}
				width={600}
				resizedOptions={{
					auth: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
				}}
				resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
			/>
		</Picture>
	),

	name: "Picture source does not render without a media attribute",
};
