import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";

export default ({ alwaysOpen = false, placeholderText, customSearchAction = null }) => {
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

	const handleSearchBtnMouseUp = (event) => {
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
	const navClassNames = `nav-search${isSearchBarOpen ? " open " : ""}`;

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
				className={isSearchBarOpen ? "search-box--right-absolute-positioned" : ""}
				variant="secondary-reverse"
				size="small"
				onClick={handleClick}
				onMouseUp={handleSearchBtnMouseUp}
				type="button"
			>
				<Icon name="Search" width={24} height={24} />
			</Button>
		</div>
	);
};
