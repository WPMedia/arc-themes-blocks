import Paragraph from ".";

export default {
	title: "Components/Paragraph",
	component: Paragraph,
};

export const Default = {
	render: () => (
		<Paragraph>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. At quis risus sed vulputate odio. Sed viverra ipsum nunc
			aliquet bibendum enim facilisis gravida. Felis bibendum ut tristique et egestas. In nisl nisi
			scelerisque eu ultrices vitae. Montes nascetur ridiculus mus mauris. Felis bibendum ut
			tristique et egestas quis ipsum suspendisse ultrices. Ultrices neque ornare aenean euismod
			elementum nisi. Erat nam at lectus urna duis convallis convallis. Nunc pulvinar sapien et
			ligula ullamcorper malesuada proin libero nunc. Gravida in fermentum et sollicitudin. At augue
			eget arcu dictum. Tincidunt eget nullam non nisi est sit amet facilisis. Libero enim sed
			faucibus turpis in eu. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar.
			Porta lorem mollis aliquam ut porttitor leo a diam. Diam maecenas sed enim ut sem. Sit amet
			luctus venenatis lectus.
		</Paragraph>
	),
};

export const OutputWithEmbeddedHtml = {
	render: () => (
		<Paragraph>
			Lorem ipsum dolor sit amet,
			<br />
			<br />
			consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
			aliqua. At quis risus sed vulputate odio. Sed viverra ipsum nunc aliquet bibendum enim
			facilisis gravida. Felis bibendum ut tristique et egestas. In nisl nisi scelerisque eu
			ultrices vitae. Montes nascetur ridiculus mus mauris. Felis bibendum ut tristique et egestas
			quis ipsum suspendisse ultrices. Ultrices neque ornare aenean euismod elementum nisi. Erat nam
			at lectus urna duis convallis convallis. Nunc pulvinar sapien et ligula ullamcorper malesuada
			proin libero nunc. Gravida in fermentum et sollicitudin. At augue eget arcu dictum. Tincidunt
			eget nullam non nisi est sit amet facilisis.
			<br />
			Libero enim sed faucibus turpis in eu.
			<br />
			Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Porta lorem mollis
			aliquam ut porttitor leo a diam. Diam maecenas sed enim ut sem. Sit amet luctus venenatis
			lectus.
		</Paragraph>
	),

	name: "Output with embedded HTML",
};

export const TruncationAtThreeLines = {
	render: () => (
		<div
			style={{
				width: "200px",
			}}
		>
			<Paragraph truncationLines={3}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. At quis risus sed vulputate odio. Sed viverra ipsum nunc
				aliquet bibendum enim facilisis gravida. Felis bibendum ut tristique et egestas. In nisl
				nisi scelerisque eu ultrices vitae. Montes nascetur ridiculus mus mauris. Felis bibendum ut
				tristique et egestas quis ipsum suspendisse ultrices. Ultrices neque ornare aenean euismod
				elementum nisi. Erat nam at lectus urna duis convallis convallis. Nunc pulvinar sapien et
				ligula ullamcorper malesuada proin libero nunc. Gravida in fermentum et sollicitudin. At
				augue eget arcu dictum. Tincidunt eget nullam non nisi est sit amet facilisis. Libero enim
				sed faucibus turpis in eu. Posuere urna nec tincidunt praesent semper feugiat nibh sed
				pulvinar. Porta lorem mollis aliquam ut porttitor leo a diam. Diam maecenas sed enim ut sem.
				Sit amet luctus venenatis lectus.
			</Paragraph>
		</div>
	),

	name: "Truncation at three lines",
};

export const TruncationAtTwoLines = {
	render: () => (
		<div
			style={{
				width: "200px",
			}}
		>
			<Paragraph truncationLines={2}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. At quis risus sed vulputate odio. Sed viverra ipsum nunc
				aliquet bibendum enim facilisis gravida. Felis bibendum ut tristique et egestas. In nisl
				nisi scelerisque eu ultrices vitae. Montes nascetur ridiculus mus mauris. Felis bibendum ut
				tristique et egestas quis ipsum suspendisse ultrices. Ultrices neque ornare aenean euismod
				elementum nisi. Erat nam at lectus urna duis convallis convallis. Nunc pulvinar sapien et
				ligula ullamcorper malesuada proin libero nunc. Gravida in fermentum et sollicitudin. At
				augue eget arcu dictum. Tincidunt eget nullam non nisi est sit amet facilisis. Libero enim
				sed faucibus turpis in eu. Posuere urna nec tincidunt praesent semper feugiat nibh sed
				pulvinar. Porta lorem mollis aliquam ut porttitor leo a diam. Diam maecenas sed enim ut sem.
				Sit amet luctus venenatis lectus.
			</Paragraph>
		</div>
	),

	name: "Truncation at two lines",
};
