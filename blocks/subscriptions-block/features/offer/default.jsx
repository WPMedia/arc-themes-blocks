import React, { useEffect, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import Identity from '@arc-publishing/sdk-identity';
import Sales from '@arc-publishing/sdk-sales';
import useOffer from '../../components/useOffer';
import GridList from '../../components/GridList';
import OfferCard from '../../components/OfferCard';
import './styles.scss';

const Offer = ({
  customFields,
}) => {
  const {
    campaignCode,
    loginURL,
    checkoutURL,
  } = customFields;

  const { arcSite } = useFusionContext();
  const { api } = getProperties(arcSite);

  Sales.options({
    apiOrigin: api?.retail?.origin || '',
    Identity,
  });

  let selectedCampaignCode = campaignCode || 'default';

  if (!isServerSide()) {
    const searchParams = new URLSearchParams(window.location.search.substring(1));
    selectedCampaignCode = searchParams.has('campaign') ? searchParams.get('campaign') : campaignCode;
  }

  const { offer } = useOffer({
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

  if (isServerSide() || !offer) {
    return null;
  }

  const buildOffers = () => {
    const offers = [];
    let x;
    let y;
    if (offer.products) {
      const { products } = offer;
      for (x = 0; x < products.length; x += 1) {
        const { pricingStrategies: strategies } = products[x];
        for (y = 0; y < strategies.length; y += 1) {
          const features = (typeof products[x].attributes !== 'undefined' && products[x].attributes.length !== 0)
            ? products[x].attributes.map((feature) => ({
              featureText: feature.value,
            }))
            : [];
          const { sku } = products[x];
          const { priceCode } = strategies[y];
          offers.push(
            <OfferCard
              key={strategies[y].pricingStrategyId}
              subHeadline={strategies[y].description}
              headline={strategies[y].name}
              actionText={strategies[y].summary}
              actionEvent={() => {
                Sales.clearCart()
                  .then(() => Sales.addItemToCart([{
                    sku,
                    priceCode,
                    quantity: 1,
                  }]))
                  .then(() => {
                    if (isLoggedIn) {
                      window.location.href = checkoutURL;
                      return;
                    }
                    window.location.href = `${loginURL}?redirect=${checkoutURL}`;
                  });
              }}
              features={features}
            />,
          );
        }
      }
    }
    return offers;
  };

  return (
    <div className="xpmedia-subscription-offer-wrapper layout-section wrap-bottom">
      <div className="xpmedia-subscription-offer-headings">
        <h1 dangerouslySetInnerHTML={{ __html: offer.pageTitle }} />
        <h2 dangerouslySetInnerHTML={{ __html: offer.pageSubTitle }} />
      </div>

      <div className="margin-md-top">
        <GridList>
          {buildOffers()}
        </GridList>
      </div>
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
