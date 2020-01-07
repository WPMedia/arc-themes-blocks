import React from 'react';
import styled from 'styled-components';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import Facebook from './images/facebook';
import Twitter from './images/twitter';
import RSS from './images/rss';
import placeholderLogo from './images/arc-placeholder-logo.svg';

import './footer.scss';

const FooterSection = styled.ul`
  font-family: ${props => props.primaryFont};
`;

const BlocksFooter = () => {
  const {
    globalContent: {
      website_url: websiteUrl = '',
    } = {},
    arcSite,
  } = useFusionContext();
  const content = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
      hierarchy: 'footer',
    },
  });
  const footerColumns = (content && content.children) ? content.children : [];
  const socialButtons = (
    <div className="footer-column">
      <button
        title="facebook"
        type="button"
        className="facebookBtn"
        onClick={() => window.open('https://www.facebook.com/', '_blank')}
      >
        <Facebook
          fill={getThemeStyle(arcSite)['primary-color']}
          title="Facebook"
          desc="Connect on Twitter"
        />
      </button>
      <button
        title="twitter"
        type="button"
        className="twitterBtn"
        onClick={() => window.open('https://twitter.com/', '_blank')}
      >
        <Twitter
          fill={getThemeStyle(arcSite)['primary-color']}
          title="Twitter"
          desc="Follow on Twitter"
        />
      </button>
      <button
        title="twitter"
        type="button"
        className="rssBtn"
        onClick={() => window.open(websiteUrl, '_blank')}
      >
        <RSS
          fill={getThemeStyle(arcSite)['primary-color']}
          title="RSS"
          desc="RSS"
        />
      </button>
    </div>
  );

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
                  (window.innerWidth > 500)
                    ? (
                      <p className="copyright" style={{ width: '100%' }}>
                        Copyright 2020 The Arc Intelligencer
                      </p>
                    )
                    : ''
                }
              </div>
              {userButtons}
            </div>
          </section>
        </div>
        <div>
          {
            (window.innerWidth > 500)
              ? ''
              : (
                <p className="copyright" style={{ width: '100%' }}>
                  Copyright 2020 The Arc Intelligencer
                </p>
              )
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
            alt={getProperties(arcSite).primaryLogoAlt || 'Navigation bar logo'}
          />
        </div>
      </div>
    </footer>
  );
};

export default BlocksFooter;
