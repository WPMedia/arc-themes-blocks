import React from "react";
import { PrimaryFont } from "@wpmedia/shared-styles";
import "./social-editable-field-styles.scss";

function SocialEditableFieldContainer({
	text,
	onDisconnectFunction,
	showDisconnectButton,
	disconnectText,
}) {
	return (
		<div>
			<PrimaryFont
				as="span"
				fontColor="primary-color"
				className="social-field--connected-label-text"
			>
				{text}
				{showDisconnectButton ? " " : ""}
			</PrimaryFont>
			{showDisconnectButton ? (
				<PrimaryFont
					as="button"
					className="social-field--disconnect-link"
					type="button"
					onClick={onDisconnectFunction}
					fontColor="primary-color"
				>
					{disconnectText}
				</PrimaryFont>
			) : null}
		</div>
	);
}

export default SocialEditableFieldContainer;
