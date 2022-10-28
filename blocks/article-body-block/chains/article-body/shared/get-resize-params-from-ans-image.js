import { RESIZER_APP_VERSION, RESIZER_URL } from "fusion:environment";
import { imageANSToImageSrc } from "@wpmedia/arc-themes-components";

const getResizeParamsFromANSImage = (ansImageItem, defaultWidth, responsiveWidths = []) => ({
	height: Math.floor((ansImageItem.height / ansImageItem.width) * defaultWidth),
	resizerURL: RESIZER_URL,
	resizedOptions: { auth: ansImageItem.auth[RESIZER_APP_VERSION] },
	...(responsiveWidths.length ? { responsiveImages: responsiveWidths } : {}),
	src: imageANSToImageSrc(ansImageItem),
	width: defaultWidth,
});

export default getResizeParamsFromANSImage;
