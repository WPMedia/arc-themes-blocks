import React from 'react';
import { useEditableContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import getPromoStyle from './promo_style';

const HeadlineText = styled.h2`
  font-family: ${(props) => props.primaryFont};
`;

const PromoHeadline = (props) => {
  const { customFields, content } = props;

  const { editableContent } = useEditableContent();
  const { arcSite } = useFusionContext();

  const imagePosition = customFields?.imagePosition || 'right';
  const headlineMarginClass = getPromoStyle(imagePosition, 'headlineMargin');

  return content ? (

    <div className={`promo-headline ${headlineMarginClass}`}>
      <a
        href={content.website_url}
        className="sm-promo-headline"
        title={content?.headlines?.basic || ''}
      >
        <HeadlineText
          primaryFont={
            getThemeStyle(getProperties(arcSite))[
              'primary-font-family'
            ]
          }
          className="sm-promo-headline"
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...editableContent(content, 'headlines.basic')}
          suppressContentEditableWarning
        >
          {content?.headlines?.basic || ''}
        </HeadlineText>
      </a>
    </div>
  ) : '';
};

export default PromoHeadline;
