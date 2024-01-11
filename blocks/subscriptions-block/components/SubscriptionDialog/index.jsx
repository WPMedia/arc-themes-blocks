import React from "react";

import PropTypes from "@arc-fusion/prop-types";
import { Heading, Link, Button, Stack } from "@wpmedia/arc-themes-components";

const SubscriptionDialog = ({
	isLoggedIn,
	actionText,
	actionUrl,
	reasonPrompt,
	headline,
	linkText,
	linkPrompt,
	linkUrl,
	subHeadline,
	className,
}) => {

	return (
		<Stack as="div" className={`${className}__subscription-dialog`}>
			<Stack>
				{reasonPrompt ? (
					<div
						className={`${className}__subscription-dialog-reason-prompt`}
						dangerouslySetInnerHTML={{ __html: reasonPrompt }}
					/>
				) : null}
				{!isLoggedIn ? (
					<div className={`${className}__subscription-dialog-link-prompt`}>
						{linkPrompt ? (
							<span
								className={`${className}__subscription-dialog-link-prompt-pre-link`}
								dangerouslySetInnerHTML={{ __html: linkPrompt }}
							/>
						) : null}
						<Link href={linkUrl} className={`${className}__subscription-dialog-link-prompt-link`}>
							{linkText}
						</Link>
					</div>
				) : null}
			</Stack>
			<Stack className={`${className}__subscription-dialog-offer-info`}>
				{headline ? <Heading dangerouslySetInnerHTML={{ __html: headline }} /> : null}
				{subHeadline ? (
					<div
						className={`${className}__subscription-dialog-subheadline`}
						dangerouslySetInnerHTML={{ __html: subHeadline }}
					/>
				) : null}
			</Stack>
			{actionUrl && actionText ? (
				<Button size="large" variant="primary" type="button" href={actionUrl}>
					<span>{actionText}</span>
				</Button>
			) : null}
		</Stack>
	);
};

SubscriptionDialog.propTypes = {
	isLoggedIn: PropTypes.boolean,
	actionText: PropTypes.string,
	actionUrl: PropTypes.string,
	reasonPrompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
	headline: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
	linkText: PropTypes.string.isRequired,
	linkPrompt: PropTypes.string,
	linkUrl: PropTypes.string.isRequired,
	subHeadline: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
};

export default SubscriptionDialog;
