import React, { useState, useRef } from "react";
import { Button, Paragraph } from "@wpmedia/arc-themes-components";

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
					{},
				);
			onSubmit(namedFields).then(() => setIsEditable(false));
		}
	};

	return showForm ? (
		<form data-testid="conditional-form" onSubmit={handleSubmit} ref={formRef}>
			{children}
		</form>
	) : (
		children
	);
}

function EditableFieldPresentational({
	blockClassName,
	cancelEdit,
	cancelText,
	children,
	editText,
	formErrorText,
	initialValue,
	label,
	onSubmit,
	saveText,
}) {
	const [isEditable, setIsEditable] = useState(!!formErrorText);
	return (
		<section className={`${blockClassName}__edit`}>
			<ConditionalFormContainer
				onSubmit={onSubmit}
				showForm={isEditable}
				setIsEditable={setIsEditable}
			>
				<div>
					{isEditable ? (
						<>
							{children}
							{formErrorText ? (
								<section role="alert">
									<Paragraph>{formErrorText}</Paragraph>
								</section>
							) : null}
							<div>
								<Button
									onClick={() => {
										if (cancelEdit) {
											cancelEdit();
										}
										setIsEditable(false);
									}}
									size="small"
									type="submit"
								>
									<span>{cancelText}</span>
								</Button>
								<Button size="small" type="submit">
									<span>{saveText}</span>
								</Button>
							</div>
						</>
					) : (
						<>
							<div className={`${blockClassName}__edit-label`}>
								<Paragraph>{label}</Paragraph>
								<Button onClick={() => setIsEditable(true)} size="small" type="button">
									<span>{editText}</span>
								</Button>
							</div>
							<Paragraph>{initialValue}</Paragraph>
						</>
					)}
				</div>
			</ConditionalFormContainer>
		</section>
	);
}

export default EditableFieldPresentational;
