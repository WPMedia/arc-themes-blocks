import React, { useRef } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Button, Heading, HeadingSection, Icon, Paragraph } from "@wpmedia/arc-themes-components";

const HeadlinedSubmitForm = ({
	buttonLabel,
	children,
	className,
	formErrorText,
	headline,
	onSubmit = () => {},
}) => {
	const formRef = useRef();

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
			onSubmit(namedFields);
		}
	};

	return (
		<section className={className}>
			<HeadingSection>
				<Heading>{headline}</Heading>
			</HeadingSection>
			<form aria-label={headline} onSubmit={handleSubmit} ref={formRef}>
				{children}
				<Button size="medium" variant="primary" fullWidth type="submit">
					{buttonLabel}
				</Button>
				{formErrorText ? (
					<section role="alert">
						<Paragraph>
							<Icon name="Error" />
							{formErrorText}
						</Paragraph>
					</section>
				) : null}
			</form>
		</section>
	);
};

HeadlinedSubmitForm.propTypes = {
	headline: PropTypes.string.isRequired,
	buttonLabel: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
	className: PropTypes.string,
};

export default HeadlinedSubmitForm;
