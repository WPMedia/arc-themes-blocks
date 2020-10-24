import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import getPromoStyle from './promo_style';
import usePromoElementLink from './promo_link';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const PromoManualHeadline = (props) => {
  const { customFields } = props;
  const { arcSite } = useFusionContext();
  const getElementLink = usePromoElementLink(customFields);

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = getPromoStyle(imagePosition, 'headlineMargin');

  const headlineText = (
    <HeadlineText
      primaryFont={getThemeStyle(getProperties(arcSite))['primary-font-family']}
      className="sm-promo-headline"
    >
      {customFields.headline}
    </HeadlineText>
  );

  return (
    <div className={`promo-headline ${headlineMarginClass}`}>
      {getElementLink(headlineText, { className: 'sm-promo-headline' })}
    </div>
  );
};

export default PromoManualHeadline;
