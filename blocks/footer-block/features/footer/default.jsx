import React from 'react';
import styled from 'styled-components';
import PropTypes from '@arc-fusion/prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import Link from '@wpmedia/links-bar-block';
import FacebookAltIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/FacebookAltIcon';
import TwitterIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/TwitterIcon';
import RssIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/RssIcon';

import './footer.scss';

const FooterSection = styled.div`
  font-family: ${(props) => props.primaryFont};
`;

export const StyledSocialContainer = styled.div`
  border: ${(props) => (props.hasSocialLinks ? '1px' : '0')} solid ${(props) => props.primaryColor};
  fill: ${(props) => props.primaryColor};

  a {
    border-right: 1px solid ${(props) => props.primaryColor};
  }
`;

const Footer = ({ customFields: { navigationConfig, lazyLoad = false } }) => {
  const { arcSite, deployment, contextPath } = useFusionContext();
  const {
    facebookPage,
    twitterUsername,
    rssUrl,
    copyrightText,
    lightBackgroundLogo,
    lightBackgroundLogoAlt,
    primaryLogo,
    primaryLogoAlt,
  } = getProperties(arcSite);

  // Check if URL is absolute/base64
  let logoUrl = lightBackgroundLogo || primaryLogo;
  if (logoUrl && !(logoUrl.indexOf('http') === 0 || logoUrl.indexOf('base64') === 0)) logoUrl = deployment(`${contextPath}/${logoUrl}`);

  const content = useContent({
    source: navigationConfig.contentService,
    query: {
      hierarchy: 'footer',
      ...navigationConfig.contentConfigValues,
    },
  });

  const footerColumns = (content && content.children) ? content.children : [];

  const socialButtons = (
    <>
      {
        (facebookPage)
          ? (
            <a
              title="Facebook page"
              target="_blank"
              rel="noopener noreferrer"
              href={facebookPage}
            >
              <FacebookAltIcon fill={getThemeStyle(arcSite)['primary-color']} />
            </a>
          )
          : ''
      }
      {
        (twitterUsername)
          ? (
            <a
              title="Twitter feed"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${twitterUsername}`}
            >
              <TwitterIcon fill={getThemeStyle(arcSite)['primary-color']} />
            </a>
          )
          : ''
      }
      {
        (rssUrl)
          ? (
            <a
              title="RSS feed"
              target="_blank"
              rel="noopener noreferrer"
              href={rssUrl}
            >
              <RssIcon fill={getThemeStyle(arcSite)['primary-color']} />
            </a>
          )
          : ''
      }
    </>
  );

  const FooterRender = () => (
    <div className="container layout-section">
      <div className="section-separator">
        <section className="footer-header">
          <div className="footer-row">
            <div className="social-column">
              <StyledSocialContainer
                className="socialBtn-container"
                primaryColor={getThemeStyle(arcSite)['primary-color']}
                hasSocialLinks={!!(facebookPage || twitterUsername || rssUrl)}
              >
                {socialButtons}
              </StyledSocialContainer>
            </div>
            <div className="copyright-column">
              {/* If large screen, show copyright over border */}
              <p className="copyright" id="copyright-top" style={{ width: '100%' }}>
                {copyrightText}
              </p>
            </div>
          </div>
        </section>
      </div>
      <div>
        {/* If small screen, show copyright under border */}
        <p className="copyright" id="copyright-bottom" style={{ width: '100%' }}>
          {copyrightText}
        </p>
      </div>
      <div className="row legacy-footer-row">
        {/* The columns are 2D arrays of columns x column items. Iterate through both */}
        {footerColumns.map((column) => {
          const columnItems = (column.children) ? column.children.map((item) => (
            <li className="footer-item" key={item._id}>
              {item.node_type === 'link' ? <Link href={item.url} name={item.display_name} /> : <Link href={item._id} name={item.name} />}
            </li>
          )) : [];
          return (
            <FooterSection
              className="footer-section col-sm-12 col-md-6 col-lg-xl-3"
              key={column._id}
              primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            >
              <h4 className="footer-header">{(column.name) ? column.name : ''}</h4>
              <ul>{columnItems}</ul>
            </FooterSection>
          );
        })}
      </div>
      {
        (logoUrl)
          ? (
            <div className="primaryLogo">
              <img
                src={logoUrl}
                alt={(lightBackgroundLogo ? lightBackgroundLogoAlt : primaryLogoAlt) || 'Footer logo'}
                className="footer-logo"
              />
            </div>
          )
          : null
      }
    </div>
  );

  return (
    <LazyLoad enabled={lazyLoad}>
      <FooterRender />
    </LazyLoad>
  );
};

Footer.propTypes = {
  customFields: PropTypes.shape({
    navigationConfig: PropTypes.contentConfig('navigation-hierarchy').tag({
      group: 'Configure Content',
      label: 'Navigation',
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
    }),
  }),
};

Footer.label = 'Footer – Arc Block';

export default Footer;
