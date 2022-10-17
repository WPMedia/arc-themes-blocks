import React from "react";
import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";

/*
  This querylySearchClick event isn't the ideal solution -

  Queryly uses a hidden checkbox in the DOM which they have an
  onChange event listener attached to.
*/
const querylySearchClick = () => {
	const event = new Event("change");
	document.getElementById("queryly_toggle").checked = true;
	document.getElementById("queryly_toggle").dispatchEvent(event);
};

const QuerylySearch = () => {
	const phrases = usePhrases();

	return (
		<Button
			aria-label={phrases.t("header-nav-chain-block.search-text")}
			onClick={querylySearchClick}
			variant="secondary-reverse"
			size="small"
		>
			<Icon name="Search" />
		</Button>
	);
};

export default QuerylySearch;
