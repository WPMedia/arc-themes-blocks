import React, { useState, useRef } from "react";
import { ErrorIcon } from "@wpmedia/engine-theme-sdk";
import { Button, BUTTON_STYLES, BUTTON_TYPES, PrimaryFont } from "@wpmedia/shared-styles";

import "./styles.scss";

// handles submit and display of form
// will toggle back to not editable upon successful submit
export function ConditionalFormContainer({ showForm, children, onSubmit, setIsEditable }) {
	const formRef = useRef();

	// handleSubmit from headline submit form
	const handleSubmit = (event) => {
		event.preventDefault();

		const valid = formRef.current.checkValidity();
		if (valid) {
			const namedFields = Array.from(formRef.current.elements)
				.filter((element) => element?.name && typeof element?.name !== "undefined")
				.reduce(
					(accumulator, element) => ({
						...accumulator,
						[element.name]: element.value,
					}),
					{}
				);
			onSubmit(namedFields).then(() => setIsEditable(false));
		}
	};

	return showForm ? (
		<form onSubmit={handleSubmit} ref={formRef}>
			{children}
		</form>
	) : (
		<>{children}</>
	);
}

function EditableFieldPresentational({
	initialValue,
	label,
	children,
	editText,
	onSubmit,
	cancelEdit,
	formErrorText,
	cancelText,
	saveText,
}) {
	const [isEditable, setIsEditable] = useState(!!formErrorText);
	return (
		<PrimaryFont as="section" className="editable-form-input">
			<ConditionalFormContainer
				showForm={isEditable}
				onSubmit={onSubmit}
				setIsEditable={setIsEditable}
			>
				<div className="editable-form-input--internal">
					{isEditable ? (
						<>
							{children}
							{formErrorText ? (
								<section className="xpmedia-form-error" role="alert">
									<PrimaryFont as="p">
										<ErrorIcon />
										{formErrorText}
									</PrimaryFont>
								</section>
							) : null}
							<div className="editable-form-input--button-container">
								<Button
									buttonStyle={BUTTON_STYLES.SECONDARY}
									buttonTypes={BUTTON_TYPES.LABEL_ONLY}
									onClick={() => {
										if (cancelEdit) {
											cancelEdit();
										}
										setIsEditable(false);
									}}
									text={cancelText}
									type="button"
								/>
								<Button
									buttonStyle={BUTTON_STYLES.PRIMARY}
									buttonTypes={BUTTON_TYPES.LABEL_ONLY}
									text={saveText}
									type="submit"
								/>
							</div>
						</>
					) : (
						<>
							<div className="editable-form-input--label-container">
								<p className="editable-form-input--label-text">{label}</p>
								<PrimaryFont
									as="button"
									className="editable-form-input--edit-button-link"
									type="button"
									onClick={() => setIsEditable(true)}
									fontColor="primary-color"
								>
									{editText}
								</PrimaryFont>
							</div>
							<p className="editable-form-input--value-text">{initialValue}</p>
						</>
					)}
				</div>
			</ConditionalFormContainer>
		</PrimaryFont>
	);
}

export default EditableFieldPresentational;
