import React from 'react';
import getPromoStyle from './promo_style';
import Title from './title';

const StoryItemHeadline = (props) => {
  const {
    itemTitle,
    primaryFont,
    websiteURL,
    customFields,
  } = props;

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = getPromoStyle(imagePosition, 'headlineMargin');

  return (
    <div className={`promo-headline ${headlineMarginClass}`}>
      <a
        href={websiteURL}
        title={itemTitle}
        className="sm-promo-headline"
      >
        <Title primaryFont={primaryFont} className="sm-promo-headline">
          {itemTitle}
        </Title>
      </a>
    </div>
  );
};

export default StoryItemHeadline;
