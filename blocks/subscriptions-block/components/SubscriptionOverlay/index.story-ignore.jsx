import React from "react";

import SubscriptionOverlay from ".";

export default {
	title: "Blocks/Subscriptions/Components/Subscription Overlay",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const LongArticle = () => {
	const textStyle = {
		margin: "0.5em auto",
		padding: "0.5em",
		maxWidth: "60vw",
	};
	return (
		<article style={textStyle}>
			<button type="button">Focusable element</button>
			<p style={textStyle}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum tincidunt placerat.
				Integer bibendum, libero sed rhoncus dapibus, ipsum nulla condimentum est, in gravida sapien
				risus nec libero. Nunc consectetur purus urna, id vehicula ante hendrerit at. Vivamus ac leo
				id lorem commodo scelerisque. Vestibulum rhoncus sed lacus eget tempus. Quisque odio elit,
				euismod a ipsum eu, posuere aliquet justo. Ut finibus est sapien, vitae mattis neque
				tincidunt et. Etiam tincidunt congue sem. Curabitur tempus, nisl eget ornare gravida, magna
				tortor ultricies elit, eu commodo dolor dui vel quam. Suspendisse potenti. Vestibulum
				dignissim elit tortor, vel scelerisque mauris consectetur eget.
			</p>
			<p style={textStyle}>
				Vestibulum blandit vel neque sollicitudin venenatis. Maecenas erat velit, eleifend at nisi
				sed, vulputate fermentum nibh. Vestibulum ut elementum ex. Vivamus convallis dolor eget
				dictum facilisis. Duis maximus tortor vitae nisi viverra luctus. Vivamus ultrices laoreet
				lectus, non dictum massa efficitur nec. Integer vitae nunc elementum, imperdiet metus ut,
				mattis lacus. Cras finibus lorem sed risus accumsan, et tempus nulla cursus.
			</p>
			<p style={textStyle}>
				In in massa vitae mauris sagittis cursus. Donec fringilla elit a lacus placerat varius.
				Nulla aliquet pulvinar eros eu egestas. Ut sed odio sed risus scelerisque efficitur. Nullam
				at pretium est. Integer tristique tristique magna ut tempus. Fusce sagittis tincidunt
				tristique. Praesent ac interdum diam. Etiam rutrum, dui eu iaculis volutpat, nisl nunc
				vehicula lacus, vitae rhoncus metus leo sit amet nibh. Praesent aliquet erat id fermentum
				ultrices. Integer ac arcu sit amet mauris aliquam aliquet. Integer et nunc vel lectus congue
				luctus non in tellus. Mauris quis neque gravida, mollis quam id, auctor odio. Donec
				placerat, sapien eget rhoncus varius, nulla eros aliquet neque, vel maximus nibh libero id
				erat.
			</p>
			<p style={textStyle}>
				Integer et dolor ut nulla mattis lobortis vitae sed enim. In quis dolor nec ex gravida
				sollicitudin. Fusce cursus eleifend fringilla. Donec magna risus, laoreet pulvinar justo ut,
				dignissim vulputate velit. Nulla vehicula, tellus eu condimentum hendrerit, sem leo
				facilisis purus, pellentesque viverra turpis mi a odio. Maecenas blandit diam tincidunt,
				volutpat magna sed, viverra justo. Quisque non mollis sem, eget fringilla felis. Aliquam
				maximus urna vitae velit sollicitudin, vel fringilla enim scelerisque. Vestibulum varius
				lacinia dui. Praesent fringilla metus id enim fringilla, nec finibus dolor condimentum.
				Donec non lorem purus. Donec sit amet dolor libero. Aliquam egestas facilisis dapibus.
			</p>
			<p style={textStyle}>
				Maecenas non eros eget nulla efficitur pulvinar. Duis varius bibendum tellus vitae feugiat.
				In vel ipsum non lorem tincidunt aliquet non vitae purus. Vivamus nec dolor id mauris
				efficitur accumsan. Vestibulum ullamcorper convallis odio. Fusce rhoncus nibh sed metus
				sodales, vel efficitur metus fringilla. Pellentesque ut erat ex.
			</p>
			<p style={textStyle}>
				Phasellus ac mattis enim. Sed non massa ut nulla aliquet pellentesque et vel est. Proin
				consequat massa a ipsum placerat luctus. Nullam ultrices, tortor sit amet mattis vestibulum,
				nulla justo pretium purus, eu lacinia lacus libero eu nibh. In tellus ex, molestie ut enim
				a, pharetra convallis arcu. Duis sit amet ultricies sem, eget rhoncus erat. Nullam volutpat,
				risus cursus tincidunt dapibus, libero ligula tempus tortor, eget fringilla diam eros et mi.
				Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
				egestas. Donec sagittis, lorem ut porta mollis, magna quam luctus mi, id condimentum odio
				ligula sed odio. Duis sagittis consequat metus, nec convallis nisl consequat a. Duis at
				turpis cursus, gravida ipsum in, fermentum sem. Donec venenatis, lacus nec molestie
				pulvinar, magna sem hendrerit ex, ac efficitur augue magna nec lorem. Vivamus et vehicula
				mi. Vestibulum blandit lorem et massa semper dignissim. Aliquam vehicula et urna at finibus.
				Nam non ante tempus, sodales odio in, pretium justo.
			</p>
			<p style={textStyle}>
				Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
				Praesent interdum ultrices odio sed vestibulum. Quisque iaculis turpis sed tincidunt
				pellentesque. Vestibulum molestie dui purus, quis maximus felis scelerisque ut. Donec sit
				amet diam faucibus dui blandit viverra. Pellentesque ultricies lorem orci, ut tempor eros
				finibus a. Fusce ac venenatis nisi. Etiam quis elit lacinia, tincidunt ligula sed, aliquet
				libero. Donec eu elit ut ipsum maximus dignissim et vitae libero. Suspendisse potenti. Nulla
				ullamcorper molestie nulla, sed accumsan nibh vulputate in. Phasellus pharetra accumsan
				lacus vitae congue.
			</p>
			<p style={textStyle}>
				Pellentesque non pellentesque velit. Nullam id enim erat. In eu condimentum mi. Proin sit
				amet blandit tortor. Morbi vehicula vehicula magna, in pretium arcu hendrerit a. Vivamus a
				sem sem. Nam vestibulum lectus id augue facilisis tincidunt. Nullam finibus semper nisi.
				Duis vehicula tellus vitae sem facilisis ultricies. Integer et nunc at tortor ultrices
				congue at vitae risus. Aenean ut nunc id quam pulvinar vehicula eu et libero. Ut nec erat et
				ex vulputate vestibulum. Nam mattis pretium felis, sit amet pellentesque justo ultricies et.
				Donec consectetur eleifend fermentum.
			</p>
			<p style={textStyle}>
				Proin in ex quam. Quisque eget tellus tellus. Donec ac tortor feugiat enim condimentum
				euismod. Mauris ac maximus leo. Nullam at tempor leo. Praesent vitae diam in diam iaculis
				pharetra. Suspendisse a nulla quis quam dictum pharetra viverra ac nulla. Vestibulum
				sollicitudin nunc vel odio blandit scelerisque. Nam eget sem et diam molestie tempor eget ut
				lorem. Pellentesque pretium rutrum vulputate. Cras fermentum sapien eu mollis tristique.
				Quisque pulvinar massa est, sodales sodales felis sodales at. Fusce aliquet, massa ac
				posuere tincidunt, erat lacus ullamcorper nunc, eget scelerisque augue nibh eu dui. Donec
				sodales neque bibendum arcu lacinia, sit amet sollicitudin neque tincidunt.
			</p>
			<p style={textStyle}>
				Suspendisse vel egestas orci, vitae dictum velit. Donec imperdiet ipsum mauris, eget mollis
				lectus gravida congue. Vestibulum porttitor id dolor id sagittis. Sed diam ligula, dictum
				ullamcorper tincidunt quis, vehicula eget ex. Aliquam hendrerit dapibus pharetra. Duis ut
				metus convallis, placerat magna id, lobortis purus. Vestibulum ut massa id dolor placerat
				consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
				turpis egestas. Nam at interdum arcu, id feugiat dolor. Etiam aliquet vestibulum dolor vel
				fermentum.
			</p>
		</article>
	);
};

export const simpleContent = () => (
	<SubscriptionOverlay>
		<div>This is some overlay content</div>
	</SubscriptionOverlay>
);

export const multiPageContent = () => (
	<SubscriptionOverlay>
		<LongArticle />
	</SubscriptionOverlay>
);

export const scrollDisabledBackground = () => (
	<>
		<LongArticle />
		<SubscriptionOverlay>
			<LongArticle />
		</SubscriptionOverlay>
	</>
);
