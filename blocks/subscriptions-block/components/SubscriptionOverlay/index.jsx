import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";

import { isServerSide } from "@wpmedia/arc-themes-components";

export const Portal = ({ children }) => {
	if (isServerSide()) return null;

	return ReactDOM.createPortal(children, document.body);
};

/**
 * The usePortal param should always be true, with the exception
 * of unit testing where portal needs to be false to prevent
 * jest and enzyme errors because
 * Portals are not currently supported by the server renderer.
 *
 * Just checking for isServerSide is not enough.
 *
 * `displayMode` param is unused at this time.
 *   We implemented 'bottomHalf' below.
 *   It can be ['bottomHalf', 'full', 'modal'].
 *
 */
const SubscriptionOverlay = ({ children, usePortal = true, className }) => {
	const overlayRef = useRef();
	const contentRef = useRef();
	const [scrollDelta, setScrollDelta] = useState(0);
	const [overlayTouchLast, setOverlayTouchLast] = useState(0);
	const [contentTouchLast, setContentTouchLast] = useState(0);

	useEffect(() => {
		const disableScroll = (event) => event.preventDefault();
		const scrollElement = overlayRef.current.ownerDocument.scrollingElement;
		const { overflow } = scrollElement.style;

		scrollElement.addEventListener("scroll", disableScroll);
		scrollElement.style.overflow = "hidden";
		scrollElement.style.maxHeight = "100vh";

		return () => {
			scrollElement.removeEventListener("scroll", disableScroll);
			scrollElement.style.overflow = overflow;
			scrollElement.style.maxHeight = "auto";
		};
	}, [overlayRef]);

	useEffect(() => {
		const contentTopFactor = overlayRef.current.scrollTop / overlayRef.current.clientHeight;

		if (contentRef.current.scrollTop >= 0 && contentTopFactor < 0.25) {
			overlayRef.current.scrollTop += scrollDelta;
		} else {
			contentRef.current.scrollTop += scrollDelta;
		}
	}, [contentRef, overlayRef, scrollDelta]);

	const renderInternalOverlay = () => (
		<section
			className={`${className}__overlay`}
			ref={overlayRef}
			onWheel={(event) => {
				setScrollDelta(event.deltaY);
			}}
			onTouchMove={(event) => {
				setScrollDelta(overlayTouchLast - event.changedTouches[0].clientY);
				setOverlayTouchLast(event.changedTouches[0].clientY);
			}}
			onTouchStart={(event) => {
				setOverlayTouchLast(event.changedTouches[0].clientY);
			}}
			role="alert"
		>
			<div
				className={`${className}__overlay-content`}
				onWheel={(event) => {
					setScrollDelta(event.deltaY);
				}}
				onTouchMove={(event) => {
					setScrollDelta(contentTouchLast - event.changedTouches[0].clientY);
					setContentTouchLast(event.changedTouches[0].clientY);
				}}
				onTouchStart={(event) => {
					setContentTouchLast(event.changedTouches[0].clientY);
				}}
				ref={contentRef}
			>
				{children}
			</div>
		</section>
	);

	const renderOverlay = () => {
		if (!usePortal || isServerSide()) {
			return <>{renderInternalOverlay()}</>;
		}
		return <Portal>{renderInternalOverlay()}</Portal>;
	};

	return renderOverlay();
};

export default SubscriptionOverlay;
