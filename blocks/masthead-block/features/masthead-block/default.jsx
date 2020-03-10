import React from 'react';
import PropTypes from 'prop-types';
import getThemeStyle from 'fusion:themes';

// styles
import MastheadItemsContainer from './_children/MastheadItemsContainer';
import HeightConstrainedImageContainer from './_children/HeightConstrainedImageContainer';
import StyledLink from './_children/StyledLink';
import GenericDivider from './_children/GenericDivider';
import HeaderContainerHideMobile from './_children/HeaderContainerHideMobile';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const showLocalMonthDateYear = (dateObject) => `${MONTH_NAMES[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

const Masthead = (props) => {
  const {
    customFields: {
      tagLine, promoLinkURL, promoLinkText, logoURL, showDate,
    }, arcSite,
  } = props;

  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  return (
    <HeaderContainerHideMobile>
      {
         logoURL && (
         <HeightConstrainedImageContainer>
           <picture>
             <img src={logoURL} alt="Masthead logo" />
           </picture>
         </HeightConstrainedImageContainer>
         )
      }
      <MastheadItemsContainer primaryFont={primaryFont}>
        <div>
          {showDate && <p>{showLocalMonthDateYear(new Date())}</p>}
        </div>
        <div>
          {tagLine && <p>{tagLine}</p>}
        </div>
        <div>
          {promoLinkURL && promoLinkText && (
          <StyledLink primaryFont={primaryFont} href={promoLinkURL}>
            {promoLinkText}
          </StyledLink>
          )}
        </div>
      </MastheadItemsContainer>
      <GenericDivider color="#000A12" size={2} />
    </HeaderContainerHideMobile>
  );
};


Masthead.label = 'Masthead – Arc Block';

Masthead.propTypes = {
  customFields: PropTypes.shape({
    logoURL: PropTypes.string.tag({
      label: 'Logo URL',
      default: '',
    }),
    tagLine: PropTypes.string.tag({
      label: 'Tag Line',
      default: '',
    }),
    showDate: PropTypes.bool.tag({
      label: 'Show Date',
      default: false,
    }),
    promoLinkURL: PropTypes.string.tag({
      label: 'Promo Link URL',
      default: '',
    }),
    promoLinkText: PropTypes.string.tag({
      label: 'Promo Link Text',
      default: '',
    }),
  }),
};

export default Masthead;
