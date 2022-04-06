import React, { useEffect, useRef, useState } from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Button,
	BUTTON_SIZES,
	BUTTON_STYLES,
	BUTTON_TYPES,
	getNavSpecificSecondaryButtonTheme,
} from "@wpmedia/shared-styles";

import "./search-box.scss";

export default ({ alwaysOpen = false, placeholderText, customSearchAction = null }) => {
	const { arcSite } = useFusionContext();
	const { locale = "en", navBarBackground, navColor = "dark" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const [shouldSearchOpen, setShouldSearchOpen] = useState(false);
	const [isSearchBarPending, setSearchBarPending] = useState(false);
	const searchInput = useRef(null);

	useEffect(() => {
		const el = searchInput.current;
		if (shouldSearchOpen) {
			el.focus();
			// Wait for open searchbar animation to finish
			setTimeout(() => {
				setSearchBarPending(false);
			}, 250);
		} else {
			el.blur();
		}
	}, [shouldSearchOpen]);

	const handleSearchBtnMousedown = (event) => {
		if (!isSearchBarPending) {
			// if open, prevent blur event so we don't get a race condition on click vs blur
			if (shouldSearchOpen) {
				event.preventDefault();
			} else {
				setSearchBarPending(true);
				setShouldSearchOpen(true);
			}
		}
	};

	const handleClick = (event) => {
		if (!isSearchBarPending) {
			event.preventDefault();
			if (customSearchAction) {
				customSearchAction(searchInput.current.value);
			} else {
				window.location.href = `/search/${searchInput.current.value}`;
			}
		}
	};

	const handleKey = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (customSearchAction) {
				customSearchAction(searchInput.current.value);
			} else {
				window.location.href = `/search/${searchInput.current.value}`;
			}
		}
	};

	const isSearchBarOpen = shouldSearchOpen || alwaysOpen;
	const navClassNames = `nav-search${isSearchBarOpen ? " open" : ""}`;
	const buttonStyle = isSearchBarOpen
		? BUTTON_STYLES.DEFAULT
		: getNavSpecificSecondaryButtonTheme(navColor, navBarBackground);

	return (
		<div className={navClassNames}>
			<input
				ref={searchInput}
				onBlur={() => {
					setShouldSearchOpen(false);
				}}
				onKeyDown={handleKey}
				type="text"
				placeholder={placeholderText}
			/>
			<Button
				aria-label={phrases.t("header-nav-chain-block.search-text")}
				additionalClassNames={isSearchBarOpen ? "search-box--right-absolute-positioned" : ""}
				buttonSize={BUTTON_SIZES.SMALL}
				buttonStyle={buttonStyle}
				buttonType={BUTTON_TYPES.ICON_ONLY}
				disabled={isSearchBarPending}
				iconType="search"
				onClick={handleClick}
				onMouseDown={handleSearchBtnMousedown}
				text={phrases.t("header-nav-chain-block.search-text")}
				type="button"
			/>
		</div>
	);
};
