import React from "react";
import { Heading, Image, Link, Stack } from "@wpmedia/arc-themes-components";

const StoryItem = (props) => {
	const {
		itemTitle = "",
		imageURL = "",
		id = "",
		classPrefix = "",
		websiteURL,
		showHeadline,
		showImage,
		targetFallbackImage,
		primaryLogoAlt,
	} = props;

	return (
		<Stack as="article" key={id} className={`${classPrefix}__item`} direction="horizontal">
			{showImage ? (
				<Link
					href={websiteURL}
					className={`${classPrefix}__item-anchor`}
					aria-hidden="true"
					tabIndex="-1"
				>
					<Image
						height={274}
						width={183}
						src={imageURL !== "" ? imageURL : targetFallbackImage}
						alt={imageURL !== "" ? itemTitle : primaryLogoAlt}
					/>
				</Link>
			) : null}
			{showHeadline && itemTitle !== "" ? (
				<Link href={websiteURL}>
					<Heading truncationLines={3}>{itemTitle}</Heading>
				</Link>
			) : null}
		</Stack>
	);
};

export default StoryItem;
