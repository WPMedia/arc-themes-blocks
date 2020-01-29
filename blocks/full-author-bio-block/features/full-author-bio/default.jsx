import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import Envelope from './images/envelope';
import Twitter from './images/twitter';
import Facebook from './images/facebook';
import Instagram from './images/instagram';
import Rss from './images/rss';
import './full-author-bio.scss';

const StyledAuthorContent = styled.div`
  font-family: ${props => props.primaryFont};
  .author-name {
    font-family: ${props => props.primaryFont};
  }
  .author-title {
    font-family: ${props => props.primaryFont};
  }
  .author-bio {
    font-family: ${props => props.primaryFont};
  }
`;

const logos = {
  email: <Envelope title="Email" alt="email" />,
  twitter: <Twitter title="Follow on Twitter" alt="twitter" />,
  facebook: <Facebook title="Connect on Facebook" alt="facebook" />,
  instagram: <Instagram title="Follow on Instagram" alt="instagram" />,
  rss: <Rss title="Rss feed" alt="rss" />,
};

function constructUrl(type, field) {
  switch (type) {
    case 'email':
      return `mailto:${field}`;
    case 'twitter':
      return `https://twitter.com/${field}`;
    case 'facebook':
      return field;
    case 'instagram':
      return `https://instagram.com/${field}`;
    case 'rss':
      return field;
    default:
      return field;
  }
}

const FullAuthorBio = () => {
  const { globalContent: content, arcSite } = useFusionContext();

  const socials = [];
  if (content.authors) {
    Object.keys(content.authors[0]).forEach((item) => {
      if ((item === 'facebook'
        || item === 'instagram'
        || item === 'email'
        || item === 'twitter'
        || item === 'rss'
      ) && item.length > 0) {
        socials.push(item);
      }
    });
  }

  return (
    !!(
      content
      && content.authors
      && content.authors[0]
      && content.authors[0].byline
      && content.authors[0].role
      && (content.authors[0].bio || content.authors[0].longBio)
      && content.authors[0].image
    ) && (
      <>
        <div className="image-container">
          <img
            src={content.authors[0].image}
            className="author-image"
            alt="Author photo"
          />
        </div>
        <div>
          <StyledAuthorContent
            className="author-content"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
          >
            <h1 className="author-name">{content.authors[0].byline}</h1>
            <h4 className="author-title">{content.authors[0].role}</h4>
            <p className="author-bio">
              {content.authors[0].longBio || content.authors[0].bio}
            </p>
          </StyledAuthorContent>
        </div>

        <div className="social-container">
          <p className="social-column" id="connect-top">
            <b>Connect</b>
          </p>
          <div className="social-items">
            <p className="social-column" id="connect-bottom">
              <b>Connect</b>
            </p>
            {
              socials.map(item => (
                <a
                  className="social-column"
                  key={item}
                  id={item}
                  href={constructUrl(item, content.authors[0][item])}
                >
                  {logos[item]}
                </a>
              ))
            }
          </div>
        </div>
      </>
    )
  );
};

FullAuthorBio.label = 'FullAuthorBio – Arc Block';

export default FullAuthorBio;
