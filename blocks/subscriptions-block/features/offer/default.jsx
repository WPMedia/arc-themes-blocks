import React, { useEffect, useRef, useState } from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import Identity from '@arc-publishing/sdk-identity';
import Sales from '@arc-publishing/sdk-sales';
import isUrl from 'is-url';
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
    apiOrigin: api.retail.origin,
    Identity,
  });

  const searchParams = new URLSearchParams(window.location.href);
  const selectedCampaignCode = searchParams.has('campaign') ? searchParams.get('campaign') : campaignCode;

  const { offer, fetchOffer } = useOffer({
    campaignCode: selectedCampaignCode,
  });
  const payWallOffer = useRef(offer);
  const [selectedOffer, setSelectedOffer] = useState(payWallOffer.current);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchNewOffer = async () => {
      payWallOffer.current = await fetchOffer(selectedCampaignCode);
      if (payWallOffer.current) {
        setSelectedOffer(payWallOffer.current);
      }
    };
    if (selectedCampaignCode && !isUrl(selectedCampaignCode)
      && (!payWallOffer.current || payWallOffer.current.pw !== selectedCampaignCode)) {
      fetchNewOffer();
    }
  }, [selectedCampaignCode, fetchOffer]);

  const getIsLoggedIn = async () => {
    const response = await Identity.isLoggedIn();
    setIsLoggedIn(response);
  };

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  if (isServerSide() || !selectedOffer) {
    return null;
  }

  const buildOffers = () => {
    const offers = [];
    let x;
    let y;
    if (selectedOffer.products) {
      const { products } = selectedOffer;
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
        <h1 dangerouslySetInnerHTML={{ __html: selectedOffer.pageTitle }} />
        <h2 dangerouslySetInnerHTML={{ __html: selectedOffer.pageSubTitle }} />
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
      defaultValue: '/login/',
    }),
    checkoutURL: PropTypes.string.tag({
      defaultValue: '/checkout/',
    }),
  }),
};

export default Offer;
