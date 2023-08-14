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
		<section>
			<ConditionalFormContainer
				showForm={isEditable}
				onSubmit={onSubmit}
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
									variant=""
									onClick={() => {
										if (cancelEdit) {
											cancelEdit();
										}
										setIsEditable(false);
									}}
									type="button"
								>
									<span>{cancelText}</span>
								</Button>
								<Button variant="" type="submit">
									<span>{saveText}</span>
								</Button>
							</div>
						</>
					) : (
						<>
							<div>
								<p>{label}</p>
								<Button type="button" onClick={() => setIsEditable(true)}>
									<span>{editText}</span>
								</Button>
							</div>
							<p>{initialValue}</p>
						</>
					)}
				</div>
			</ConditionalFormContainer>
		</section>
	);
}

export default EditableFieldPresentational;
