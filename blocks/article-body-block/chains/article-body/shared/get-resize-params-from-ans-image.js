import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import getProperties from "fusion:properties";
import { imageANSToImageSrc } from "@wpmedia/arc-themes-components";

const getResizeParamsFromANSImage = (
	ansImageItem,
	arcSite,
	defaultWidth,
	responsiveWidths = []
) => {
	const { resizerURL } = getProperties(arcSite);
	return {
		height: Math.floor((ansImageItem.height / ansImageItem.width) * defaultWidth),
		resizerURL,
		resizedOptions: { auth: ansImageItem.auth[RESIZER_TOKEN_VERSION] },
		...(responsiveWidths.length ? { responsiveImages: responsiveWidths } : {}),
		src: imageANSToImageSrc(ansImageItem),
		width: defaultWidth,
	};
};

export default getResizeParamsFromANSImage;
