import { Link } from "@wpmedia/arc-themes-components";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const NavLogo = ({ mediumBreakpoint, imageAltText, imageSource, blockClassName }) => {
	const [isLogoVisible, setLogoVisibility] = useState(false);

	// istanbul ignore next
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
			// istanbul ignore next
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

		// istanbul ignore next
		return () => {
			clearTimeout(timerID);
		};
	}, [mediumBreakpoint]);

	return (
		<Link
			href="/"
			title={imageAltText}
			className={`${blockClassName}__logo ${isLogoVisible ? "nav-logo-show" : "nav-logo-hidden"}`}
			assistiveHidden={!isLogoVisible}
		>
			{imageSource ? <img src={imageSource} alt={imageAltText || ""} /> : null}
		</Link>
	);
};

export default NavLogo;
