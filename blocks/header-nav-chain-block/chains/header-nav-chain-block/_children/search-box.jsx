import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";

export default ({
	alwaysOpen = false,
	placeholderText,
	customSearchAction = null,
	justification,
}) => {
	const phrases = usePhrases();

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
	const navClassNames = `nav-search${justification === "right" ? "-right" : ""}${
		isSearchBarOpen ? " open " : ""
	}`;

	// Set the class name for the search button. It will be empty if the search bar is not open
	let buttonClassName = "";
	if (isSearchBarOpen && justification !== "right") {
		buttonClassName = "search-box--right-absolute-positioned";
	} else if (isSearchBarOpen && justification === "right") {
		buttonClassName = "search-box--left-absolute-positioned";
	} else {
		buttonClassName = "";
	}

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
				accessibilityLabel={phrases.t("header-nav-chain-block.search-text")}
				className={buttonClassName}
				variant="secondary-reverse"
				size="small"
				onClick={handleClick}
				onMouseDown={handleSearchBtnMousedown}
				type="button"
			>
				<Icon name="Search" width={24} height={24} />
			</Button>
		</div>
	);
};
