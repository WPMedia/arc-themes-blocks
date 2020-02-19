import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import {
  EnvelopeIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  RssIcon,
} from '@arc-test-org/engine-theme-sdk';
import './full-author-bio.scss';

const StyledAuthorContent = styled.div`
  font-family: ${(props) => props.primaryFont};
  .author-name {
    font-family: ${(props) => props.primaryFont};
  }
  .author-title {
    font-family: ${(props) => props.primaryFont};
  }
  .author-bio {
    font-family: ${(props) => props.secondaryFont};
  }
`;

const logos = {
  email: <EnvelopeIcon title="Email" description="Email" alt="email" />,
  twitter: <TwitterIcon title="Follow on Twitter" description="Twitter" alt="twitter" />,
  facebook: <FacebookIcon title="Connect on Facebook" description="Facebook" alt="facebook" />,
  instagram: <InstagramIcon title="Follow on Instagram" description="Instagram" alt="instagram" />,
  rss: <RssIcon title="Rss feed" description="Rss" alt="rss" />,
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
      if (Object.keys(logos).includes(item)) {
        socials.push(item);
      }
    });
  }

  return (
    !!(
      content
      && content.authors
      && content.authors[0]
    ) && (
      <>
        <div className="image-container">
          {
            (content.authors[0].image) && (
              <img
                src={content.authors[0].image}
                className="author-image"
                alt="Author photo"
              />
            )
          }
        </div>
        <div>
          <StyledAuthorContent
            className="author-content"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
            primaryColor={getThemeStyle(arcSite)['primary-color']}
          >
            {
              (content.authors[0].byline) && (
                <h1 className="author-name">{content.authors[0].byline}</h1>
              )
            }
            {
              (content.authors[0].role) && (
                <h2 className="author-title h4-primary">{content.authors[0].role}</h2>
              )
            }
            {
              (content.authors[0].bio || content.authors[0].longBio) && (
                <p className="author-bio">
                  {content.authors[0].longBio || content.authors[0].bio}
                </p>
              )
            }
          </StyledAuthorContent>
        </div>

        <div className="social-container">
          <p className="connect-label">
            <strong>Connect</strong>
          </p>
          <div className="social-items">
            {
              socials.map((item) => (
                <a
                  className={`social-column ${item}`}
                  key={item}
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
