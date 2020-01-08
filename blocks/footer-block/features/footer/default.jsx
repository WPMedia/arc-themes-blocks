import React from 'react';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import facebook from './images/facebook.svg';
import twitter from './images/twitter.svg';
import rss from './images/rss.svg';
import placeholderLogo from './images/arc-placeholder-logo.svg';

import './footer.scss';

const FooterSection = styled.ul`
  font-family: ${props => props.primaryFont};
`;

const BlocksFooter = () => {
  const { arcSite } = useFusionContext();

  const content = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
      hierarchy: 'footer',
    },
  });

  const footerColumns = (content && content.children) ? content.children : [];

  const copyright = (
    <p className="copyright" style={{ width: '100%' }}>
      {getProperties(arcSite).copyrightText}
    </p>
  );

  const socialButtons = (
    <div className="footer-column">
      {
        (getProperties(arcSite).facebookPage)
          ? (
            <button
              title="facebook"
              type="button"
              className="facebookBtn"
              onClick={
                () => window.open(`https://www.facebook.com/${getProperties(arcSite).facebookPage}`, '_blank')
              }
            >
              <img src={facebook} alt="facebook" />
            </button>
          )
          : ''
      }
      {
        (getProperties(arcSite).twitterUsername)
          ? (
            <button
              title="twitter"
              type="button"
              className="twitterBtn"
              onClick={
                () => window.open(`https://twitter.com/${getProperties(arcSite).twitterUsername}`, '_blank')
              }
            >
              <img src={twitter} alt="twitter" />
            </button>
          )
          : ''
      }
      {
        (getProperties(arcSite).rssUrl)
          ? (
            <button
              title="rss"
              type="button"
              className="rssBtn"
              onClick={
                () => window.open(getProperties(arcSite).rssUrl, '_blank')
              }
            >
              <img src={rss} alt="rss" />
            </button>
          )
          : ''
      }
    </div>
  );

  /* Placeholder buttons for maintaining layout */
  const userButtons = (
    <div className="footer-column userButtons">
      {
        (window.innerWidth > 500)
          ? (
            <>
              <button
                type="button"
                className="subscribeBtn"
                onClick={() => alert('clicked')}
              >
                Subscribe
              </button>
              <button
                type="button"
                className="signInBtn"
                onClick={() => alert('clicked')}
              >
                Sign In
              </button>
            </>
          )
          : null
      }
    </div>
  );

  return (
    <footer>
      <div className="container">
        <div className="section-separator">
          <section className="footer-header">
            <div className="footer-row">
              {socialButtons}
              <div className="footer-column">
                {
                  /* If large screen, show copyright over border */
                  (window.innerWidth > 500)
                    ? copyright
                    : ''
                }
              </div>
              {userButtons}
            </div>
          </section>
        </div>
        <div>
          {
            /* If small screen, show copyright under border */
            (window.innerWidth > 500)
              ? ''
              : copyright
          }
        </div>
        <div className="row">
          {/* The columns are 2D arrays of columns x column items. Iterate through both */}
          {footerColumns.map((column) => {
            const columnItems = (column.children) ? column.children.map(item => (
              <li className="footer-item" key={item._id}>
                <a href={item.url}>{item.display_name}</a>
              </li>
            )) : [];

            return (
              <FooterSection
                className="footer-section col-sm-12 col-md-6 col-lg-xl-3"
                key={column._id}
                primaryFont={getThemeStyle(arcSite)['primary-font-family']}
              >
                <section className="footer-header">{(column.name) ? column.name : ''}</section>
                {columnItems}
              </FooterSection>
            );
          })}
        </div>
        <div className="primaryLogo">
          <img
            src={getProperties(arcSite).primaryLogo || placeholderLogo}
            alt={getProperties(arcSite).primaryLogoAlt || 'Footer logo'}
          />
        </div>
      </div>
    </footer>
  );
};

export default BlocksFooter;
