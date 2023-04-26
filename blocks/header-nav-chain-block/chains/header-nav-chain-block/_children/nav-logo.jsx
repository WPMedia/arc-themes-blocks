import { Link } from "@wpmedia/arc-themes-components";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const showLogoAbove = 768;

const NavLogo = ({ imageAltText, imageSource, blockClassName, logoAlignment }) => {
	const [isLogoVisible, setLogoVisibility] = useState(false);

	// istanbul ignore next
	const onScrollEvent = (evt) => {
		if (!evt) {
			return;
		}
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		if (vw < showLogoAbove) {
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

	const onScrollDebounced = useDebouncedCallback(onScrollEvent, 100);

	useEffect(() => {
		const mastHead = document.querySelector(".b-masthead .b-masthead__logo");
		if (!mastHead) {
			return undefined;
		}
		window.addEventListener("scroll", onScrollDebounced, { passive: true });
		// istanbul ignore next
		return () => {
			window.removeEventListener("scroll", onScrollDebounced, { passive: true });
		};
	}, [onScrollDebounced]);

	useEffect(() => {
		const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

		if (vw < showLogoAbove) {
			setLogoVisibility(true);
			return undefined;
		}

		const timerID = setTimeout(() => {
			const mastHead = document.querySelector(".b-masthead .b-masthead__logo");
			if (!mastHead) {
				setLogoVisibility(true);
			}
		}, 1000);

		// istanbul ignore next
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const isLogoSVG = !!imageSource && String(imageSource).endsWith(".svg");

	return (
		<Link
			href="/"
			title={imageAltText}
			className={`${blockClassName}__logo ${
				logoAlignment === "center" ? `${blockClassName}__logo--center` : ``
			} ${isLogoVisible ? "nav-logo-show" : "nav-logo-hidden"} ${isLogoSVG ? "svg-logo" : ""}`}
			assistiveHidden={!isLogoVisible}
		>
			{imageSource ? (
				<img src={imageSource} alt={imageAltText || ""} data-chromatic="ignore" />
			) : null}
		</Link>
	);
};

export default NavLogo;
