import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { localizeDate } from '@wpmedia/engine-theme-sdk';

// styles
import { PrimaryFont } from '@wpmedia/shared-styles';
import MastheadItemsContainer from './_children/MastheadItemsContainer';
import HeightConstrainedImageContainer from './_children/HeightConstrainedImageContainer';
import GenericDivider from './_children/GenericDivider';
import HeaderContainerHideMobile from './_children/HeaderContainerHideMobile';

import './masthead-block.scss';

// takes in a date from parent
export const MastheadPresentational = (props) => {
  const {
    customFields: {
      tagLine, promoLinkURL, promoLinkText, logoURL, showDate,
    },
    displayDate,
  } = props;

  return (
    <HeaderContainerHideMobile className="masthead-block-container">
      {
         logoURL && (
         <HeightConstrainedImageContainer className="masthead-block-logo">
           <picture>
             <img src={logoURL} alt="Masthead logo" />
           </picture>
         </HeightConstrainedImageContainer>
         )
      }
      <MastheadItemsContainer>
        <div>
          {showDate && <PrimaryFont as="p" className="masthead-block--text">{displayDate}</PrimaryFont>}
        </div>
        <div>
          {tagLine && <PrimaryFont as="p" className="masthead-block--text">{tagLine}</PrimaryFont>}
        </div>
        <div>
          {promoLinkURL && promoLinkText && (
          <PrimaryFont as="a" href={promoLinkURL} className="masthead-block--text masthead-block--promo-link">
            {promoLinkText}
          </PrimaryFont>
          )}
        </div>
      </MastheadItemsContainer>
      <GenericDivider color="#000A12" size={2} />
    </HeaderContainerHideMobile>
  );
};

// need to get current time and format
const MastheadContainer = (props) => {
  const { arcSite } = useFusionContext();
  const {
    dateLocalization: { language, timeZone, dateFormat } = { language: 'en', timeZone: 'GMT', dateFormat: 'LLLL d, yyyy' },
  } = getProperties(arcSite);

  const displayDate = localizeDate(new Date(), dateFormat, language, timeZone);

  return (
    <MastheadPresentational {...props} displayDate={displayDate} />
  );
};

MastheadContainer.label = 'Masthead – Arc Block';

MastheadContainer.icon = 'arc-masthead';

MastheadContainer.propTypes = {
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

export default MastheadContainer;
