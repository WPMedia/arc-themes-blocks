import React from "react";
import { Button } from "@wpmedia/arc-themes-components";

function SocialEditableFieldContainer({
	text,
	onDisconnectFunction,
	showDisconnectButton,
	disconnectText,
}) {
	return (
		<div>
			<span>
				{text}
				{showDisconnectButton ? " " : ""}
			</span>
			{showDisconnectButton ? (
				<Button size="small" variant="default" type="submit" onClick={onDisconnectFunction}>
					{disconnectText}
				</Button>
			) : null}
		</div>
	);
}

export default SocialEditableFieldContainer;
