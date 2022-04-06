import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const NavLogo = ({ alignment, mediumBreakpoint, imageAltText, imageSource }) => {
	const [isLogoVisible, setLogoVisibility] = useState(false);

	const onScrollEvent = (evt) => {
		if (!evt) {
			return;
		}

		const scrollTop = evt.target?.documentElement?.scrollTop;
		if (typeof scrollTop === "undefined") {
			return;
		}

		if (scrollTop > 150) {
			setLogoVisibility(true);
		}
		if (scrollTop < 30) {
			setLogoVisibility(false);
		}
	};

	const [onScrollDebounced] = useDebouncedCallback(onScrollEvent, 100);

	useEffect(() => {
		const mastHead = document.querySelector(".masthead-block-container .masthead-block-logo");
		if (!mastHead) {
			return undefined;
		}
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		// on small viewports we do not need this
		if (vw >= mediumBreakpoint) {
			window.addEventListener("scroll", onScrollDebounced);
			return () => {
				window.removeEventListener("scroll", onScrollDebounced);
			};
		}
		// istanbul ignore next
		return undefined;
	}, [onScrollDebounced, mediumBreakpoint]);

	useEffect(() => {
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		if (vw < mediumBreakpoint) {
			setLogoVisibility(true);
			return undefined;
		}

		const timerID = setTimeout(() => {
			const mastHead = document.querySelector(".masthead-block-container .masthead-block-logo");
			if (!mastHead) {
				setLogoVisibility(true);
			}
		}, 1000);

		return () => {
			clearTimeout(timerID);
		};
	}, [mediumBreakpoint]);

	const isLogoSVG = !!imageSource && String(imageSource).endsWith(".svg");

	return (
		<div
			className={`nav-logo nav-logo-${alignment} ${
				isLogoVisible ? "nav-logo-show" : "nav-logo-hidden"
			} ${isLogoSVG ? "svg-logo" : ""}`}
		>
			<a href="/" title={imageAltText}>
				{!!imageSource && <img src={imageSource} alt={imageAltText || ""} />}
			</a>
		</div>
	);
};

export default NavLogo;
