import React, { useRef, useEffect, useState } from "react";
import { useFusionContext } from "fusion:context";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import { Image, imageANSToImageSrc } from "@wpmedia/arc-themes-components";

function useOnScreen(ref) {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
			rootMargin: "-50% 0% -50% 0%",
		});
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, [ref]);
	return isIntersecting;
}

const MainImage = ({ image, loading, onVisible }) => {
	const BLOCK_CLASS_NAME = "b-product-gallery";
	const ref = useRef();
	const isVisible = useOnScreen(ref);
	const { arcSite } = useFusionContext();
	const { resizerURL } = getProperties(arcSite);

	useEffect(() => {
		if (isVisible) {
			onVisible(image._id);
		}
	}, [isVisible, onVisible, image._id]);

	return (
		<div ref={ref}>
			<Image
				// used as part of a page design so empty string alt text
				alt=""
				className={`${BLOCK_CLASS_NAME}__focus-view-main-image`}
				loading={loading || (isVisible ? "eager" : "lazy")}
				resizedOptions={{ auth: image.auth[RESIZER_TOKEN_VERSION] }}
				resizerURL={resizerURL}
				responsiveImages={[150, 375, 500, 1500, 2000]}
				src={imageANSToImageSrc(image)}
			/>
		</div>
	);
};

export default MainImage;
