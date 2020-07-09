import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { localizeDate } from '@wpmedia/engine-theme-sdk';

// styles
import MastheadItemsContainer from './_children/MastheadItemsContainer';
import HeightConstrainedImageContainer from './_children/HeightConstrainedImageContainer';
import StyledLink from './_children/StyledLink';
import GenericDivider from './_children/GenericDivider';
import HeaderContainerHideMobile from './_children/HeaderContainerHideMobile';

import './masthead-block.scss';

const Masthead = (props) => {
  const {
    customFields: {
      tagLine, promoLinkURL, promoLinkText, logoURL, showDate,
    },
  } = props;
  const { arcSite } = useFusionContext();
  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  const {
    dateLocalization: { language, timeZone, dateFormat } = { language: 'en', timeZone: 'GMT', dateFormat: 'LLLL d, yyyy' },
  } = getProperties(arcSite);
  const displayDate = localizeDate(new Date(), dateFormat, language, timeZone);

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
          {showDate && <p className="masthead-block--text">{displayDate}</p>}
        </div>
        <div>
          {tagLine && <p className="masthead-block--text">{tagLine}</p>}
        </div>
        <div>
          {promoLinkURL && promoLinkText && (
          <StyledLink primaryFont={primaryFont} href={promoLinkURL} className="masthead-block--text">
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
