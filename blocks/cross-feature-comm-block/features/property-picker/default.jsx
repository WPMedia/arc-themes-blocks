import React, { useState } from "react";

import useCustomEvent from "../../utils/use-custom-event";

const Section = ({ children, message, title }) => (
	<section
		style={{
			border: "1px solid grey",
			display: "flex",
			flexDirection: "column",
			gap: "1em",
			margin: "0.5em",
		}}
	>
		<header style={{ textAlign: "center", borderBottom: "1px dashed #000", width: "100%" }}>
			{title}
		</header>
		{children}
		<footer>{message ? <div>{message}</div> : null}</footer>
	</section>
);

const Color = ({ color, currentColor, ...rest }) => (
	<div
		{...rest}
		style={{
			backgroundColor: color,
			borderRadius: "1em",
			display: "inline-block",
			height: "1em",
			margin: "0.25em",
			outline: `3px solid ${currentColor === color ? "black" : "transparent"}`,
			width: "1em",
		}}
		title={color}
	/>
);

function PropertyPicker() {
	const [message, setMessage] = useState("");

	const localData = {
		potentialColors: ["red", "green", "blue"],
		potentialSizes: ["small", "medium", "large"],
	};

	const dispatchEvent = useCustomEvent();

	useCustomEvent("aCrazyBroadcast", ({ detail }) => {
		setMessage(detail.message);
	});

	return (
		<>
			<Section title="Events Example" message={message}>
				<fieldset>
					<legend>Pick from available colors:</legend>
					{localData.potentialColors.map((color) => (
						<Color
							color={color}
							currentColor={localData?.color}
							key={color}
							onClick={() => dispatchEvent("userPickedColor", { color })}
						/>
					))}
				</fieldset>
				<fieldset>
					<legend>Pick from available sizes:</legend>
					{localData.potentialSizes.map((size) => (
						<label key={size} style={{ display: "block", margin: "0.25em" }}>
							<input
								checked={localData.current?.size === size}
								onClick={() => dispatchEvent("userPickedSize", { size })}
								readOnly
								type="radio"
								value={size}
							/>
							{size}
						</label>
					))}
				</fieldset>
			</Section>
		</>
	);
}

PropertyPicker.label = "Property Picker – Arc Block";

export default PropertyPicker;
