import React, { Fragment } from 'react';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';

import envelop from './images/envelope.svg';
import instagram from './images/instagram.svg'
import linkedin from './images/linkedin.svg';
import twitter from './images/twitter.svg';
import './author-bio.scss';

/*
Testing: Unit tests are written to cover this block
*/


const AuthorBioStyled = styled.section`
  font-family: ${props => props.secondaryFont};
  h2 {
    font-family: ${props => props.primaryFont};
    color: ${props => props.primaryFontColor};
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
                    <span>Connect</span>
                    <img src={linkedin} alt="Connect on LinkedIn" />
                  </a>
                );
                break;
              case 'twitter':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <span>Follow</span>
                    <img src={twitter} alt="Follow Twitter profile" />
                  </a>
                );
                break;
              case 'instagram':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <span>Follow</span>
                    <img src={instagram} alt="Follow Instagram profile" />
                  </a>
                );
                break;
              default:
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <span>Contact</span>
                    <img src={envelop} alt="Contact Author" />
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
      const authorName = (original.byline) ? <h2>{original.byline}</h2> : undefined;
      const authorNameWithHyperlink = (author.url)
        ? <a href={author.url}>{authorName}</a> : undefined;

      authorList.push((
        <section key={(author.name) ? author.name : ''} className="authors">
          {(author.image) ? <img src={author.image.url} alt={author.name} /> : null}
          <section className="descriptions">
            {authorNameWithHyperlink || authorName}
            {(author.description) ? <p>{author.description}</p> : null}
            <section className="socialButtons">
              {socialLinks}
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
      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
      primaryFontColor={getThemeStyle(arcSite)['primary-font-color']}
    >
      {authors}
    </AuthorBioStyled>
  );
};

export default AuthorBio;
