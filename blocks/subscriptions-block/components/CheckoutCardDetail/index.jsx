import React from "react";
import { usePhrases, Heading, Stack, Divider, Paragraph } from "@wpmedia/arc-themes-components";
import PropTypes from "@arc-fusion/prop-types";

export const ACCOUNT = "Account";
export const BILLING_ADDRESS = "Billing Address";
export const PAYMENT = "Payment";
export const REVIEW = "Review";

const CheckoutCardDetail = ({ type, summary, children, link, className, isOpen, isComplete }) => {
	const phrases = usePhrases();

	const getTitle = () => {
		if (type === ACCOUNT) return `1. ${phrases.t("checkout-block.account")}`;
		if (type === BILLING_ADDRESS) return `2. ${phrases.t("checkout-block.billingAddress")}`;
		if (type === PAYMENT) return `3. ${phrases.t("checkout-block.payment")}`;
		if (type === REVIEW) return `4. ${phrases.t("checkout-block.review")}`;
		return null;
	}

	return (
		<div>
			<Divider />
			<Stack className={isOpen ? className : `${className}-closed`} direction="horizontal" gap="16px">
				<Heading>{getTitle()}</Heading>
				{!isOpen && isComplete && <div className={`${className}-summary`}>
					<Paragraph>{summary}</Paragraph>
					{link}
				</div>}
			</Stack>
			{isOpen && <div className={`${className}-children-div`}>{children}</div>}
		</div>
	);
};

CheckoutCardDetail.propTypes = {
	type: PropTypes.oneOf([ACCOUNT, BILLING_ADDRESS, PAYMENT, REVIEW]).isRequired,
	summary: PropTypes.string,
	children: PropTypes.any,
	link: PropTypes.any,
	isOpen: PropTypes.boolean,
	isComplete: PropTypes.boolean
}

export default CheckoutCardDetail;
