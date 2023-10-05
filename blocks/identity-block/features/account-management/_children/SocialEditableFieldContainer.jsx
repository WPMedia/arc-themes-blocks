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
				<Button
					size="medium"
					variant="primary-reverse"
					type="submit"
					onClick={onDisconnectFunction}
				>
					{disconnectText}
				</Button>
			) : null}
		</div>
	);
}

export default SocialEditableFieldContainer;
