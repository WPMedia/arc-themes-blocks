import React, { useEffect, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';
import Identity from '@arc-publishing/sdk-identity';
import { PrimaryFont, SecondaryFont } from '@wpmedia/shared-styles';
import useOffer from '../../components/useOffer';
import OfferToProductList from '../../components/OfferToProductList';
import './styles.scss';

const Offer = ({
  customFields,
}) => {
  const {
    campaignCode,
    loginURL,
    checkoutURL,
  } = customFields;

  let selectedCampaignCode = campaignCode || 'default';

  if (!isServerSide()) {
    const searchParams = new URLSearchParams(window.location.search.substring(1));
    selectedCampaignCode = searchParams.has('campaign') ? searchParams.get('campaign') : campaignCode;
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
    <div className="xpmedia-subscription-offer-wrapper layout-section wrap-bottom">
      {!isFetching && offer ? (
        <>
          <div className="xpmedia-subscription-offer-headings">
            <PrimaryFont
              dangerouslySetInnerHTML={{ __html: offer.pageTitle }}
              as="h1"
            />
            <SecondaryFont
              dangerouslySetInnerHTML={{ __html: offer.pageTitle }}
              as="h2"
            />
          </div>

          <div className="margin-md-top">
            <OfferToProductList
              offer={offer}
              isLoggedIn={isLoggedIn}
              checkoutURL={checkoutURL}
              loginURL={loginURL}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

Offer.label = 'Offer - Arc Block';

Offer.propTypes = {
  customFields: PropTypes.shape({
    campaignCode: PropTypes.string.tag({
      defaultValue: 'default',
    }),
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    }),
    checkoutURL: PropTypes.string.tag({
      defaultValue: '/checkout/',
    }),
  }),
};

export default Offer;
