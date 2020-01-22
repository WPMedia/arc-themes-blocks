import React, { Fragment } from 'react';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import { Image } from '@arc-test-org/engine-theme-sdk';

import Envelope from './images/envelope';
import Instagram from './images/instagram';
import LinkedIn from './images/linkedin';
import Twitter from './images/twitter';
import './author-bio.scss';

/*
Testing: Unit tests are written to cover this block
*/

const AuthorBioStyled = styled.section`
  font-family: ${props => props.primaryFont};
  .authorName {
    font-family: ${props => props.primaryFont};
    color: ${props => props.primaryColor};
  }
  button {
    font-family: ${props => props.primaryFont};
  }
`;

const AuthorBio = () => {
  const { globalContent: content, arcSite } = useFusionContext();
  const { credits } = content;
  const { by } = credits;

  // Generate a list of author components
  const authors = by.reduce((authorList, author) => {
    const { additional_properties: additionalProperties } = author;
    const { original } = additionalProperties;

    // If the author doesn't have a description, then do not add them to the list
    // Also check for their bio, which means that they are a staff
    if (author.description && author.description.length > 0
      && original.bio && original.bio.length > 0) {
      // A loop to generate the list of social media links.
      // If no url is provided, then the social link will be skipped.
      const socialLinks = (author.social_links && author.social_links.length > 0)
        ? author.social_links.reduce((result, socialLink) => {
          if (socialLink.site && socialLink.url && socialLink.url.length > 0) {
            let socialButton;
            switch (socialLink.site) {
              case 'linkedin':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <LinkedIn fill={getThemeStyle(arcSite)['primary-color']} title="LinkedIn" desc="Connect on LinkedIn" />
                  </a>
                );
                break;
              case 'twitter':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <Twitter fill={getThemeStyle(arcSite)['primary-color']} title="Twitter" desc="Connect on Twitter" />
                  </a>
                );
                break;
              case 'instagram':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <Instagram fill={getThemeStyle(arcSite)['primary-color']} title="Instagram" desc="Connect on Instagram" />
                  </a>
                );
                break;
              default:
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <Envelope fill={getThemeStyle(arcSite)['primary-color']} title="Email" desc="Send an email" />
                  </a>
                );
            }
            result.push((
              <Fragment key={socialLink.site}>
                {socialButton}
              </Fragment>
            ));
          }
          return result;
        }, [])
        : null;

      // Make the name a hyperlink if a url to the bio page is provided
      const authorName = (original.byline) ? <h2 className="authorName">{original.byline}</h2> : undefined;
      const authorNameWithHyperlink = (author.url)
        ? <a href={author.url}>{authorName}</a> : undefined;

      authorList.push((
        <section key={(author.name) ? author.name : ''} className="authors">
          <section className="author">
            {
              (author.image && author.image.url)
                ? (
                  <Image
                    url={author.image.url}
                    alt={(author.image.alt_text || author.name)}
                    smallWidth={84}
                    smallHeight={0}
                    mediumWidth={84}
                    mediumHeight={0}
                    largeWidth={84}
                    largeHeight={0}
                  />
                )
                : null
            }
            <section className="descriptions">
              {authorNameWithHyperlink || authorName}
              {(author.description) ? <p>{author.description}</p> : null}
              <section className="socialButtons">
                {socialLinks}
              </section>
            </section>
          </section>
        </section>
      ));
    }

    return authorList;
  }, []);

  return (
    <AuthorBioStyled
      className="author-bio"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      primaryColor={getThemeStyle(arcSite)['primary-color']}
    >
      {authors}
    </AuthorBioStyled>
  );
};

AuthorBio.label = 'Short Author Bio – Arc Block';

export default AuthorBio;
