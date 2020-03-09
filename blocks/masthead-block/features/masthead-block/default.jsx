import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';


const MastheadItemsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  > div {
    flex: 1;
    display: flex;
    align-items: flex-end;

    > p {
      font-size: 14px;
      line-height: 16px;
      font-family: ${(props) => props.primaryFont};
      margin: 0;
      color: #191919;
    }
  }

  > div:first-child {
    justify-content: flex-start;
  }

  > div:nth-child(2) {
    justify-content: center;
  }

  > div:nth-child(3) {
    justify-content: flex-end;
  }
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  color: #191919;
`;

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
    <header>
      <div>
        {logoURL && <img src={logoURL} alt="Masthead logo" />}
      </div>
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
      <hr color="#000A12" size={2} />
    </header>
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
