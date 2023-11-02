import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Identity } from "@arc-publishing/sdk-identity";
import { Heading, Paragraph, isServerSide } from "@wpmedia/arc-themes-components";
import useOffer from "../../components/useOffer";
import OfferToProductList from "../../components/OfferToProductList";

const BLOCK_CLASS_NAME = "b-offer";

const Offer = ({ customFields }) => {
	const { campaignCode, loginURL, checkoutURL } = customFields;

	let selectedCampaignCode = campaignCode || "default";

	if (!isServerSide()) {
		const searchParams = new URLSearchParams(window.location.search.substring(1));
		selectedCampaignCode = searchParams.has("campaign")
			? searchParams.get("campaign")
			: campaignCode;
	}

	const { offer, isFetching } = useOffer({
		campaignCode: selectedCampaignCode,
	});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const getIsLoggedIn = async () => {
		const response = await Identity.isLoggedIn();
		setIsLoggedIn(response);
	};

	useEffect(() => {
		getIsLoggedIn();
	}, []);

	if (isServerSide()) {
		return null;
	}

	return (
		<div className={BLOCK_CLASS_NAME}>
			{!isFetching && offer ? (
				<>
					<section className={`${BLOCK_CLASS_NAME}__headings`}>
						<Heading
							className={`${BLOCK_CLASS_NAME}__title`}
							dangerouslySetInnerHTML={{ __html: offer.pageTitle }}
						/>
						<Paragraph
							className={`${BLOCK_CLASS_NAME}__subtitle`}
							dangerouslySetInnerHTML={{ __html: offer.pageSubTitle }}
						/>
					</section>
					<div className={`${BLOCK_CLASS_NAME}__wrapper`}>
						<OfferToProductList
							offer={offer}
							isLoggedIn={isLoggedIn}
							checkoutURL={checkoutURL}
							loginURL={loginURL}
							className={BLOCK_CLASS_NAME}
						/>
					</div>
				</>
			) : null}
		</div>
	);
};

Offer.propTypes = {
	customFields: PropTypes.shape({
		campaignCode: PropTypes.string.tag({
			defaultValue: "default",
		}),
		loginURL: PropTypes.string.tag({
			defaultValue: "/account/login/",
		}),
		checkoutURL: PropTypes.string.tag({
			defaultValue: "/checkout/",
		}),
	}),
};

Offer.label = "Offer - Arc Block";
export default Offer;