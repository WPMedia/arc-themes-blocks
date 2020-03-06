import React, { Fragment } from 'react';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import {
  Image,
  EnvelopeIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
  RedditIcon,
  YoutubeIcon,
  MediumIcon,
  TumblrIcon,
  PinterestIcon,
  SnapchatIcon,
  WhatsAppIcon,
  SoundCloudIcon,
  RssIcon,
} from '@wpmedia/engine-theme-sdk';

import './author-bio.scss';

/*
Testing: Unit tests are written to cover this block
*/

const AuthorBioStyled = styled.section`
  font-family: ${(props) => props.primaryFont};
  .authorName {
    font-family: ${(props) => props.primaryFont};
    color: ${(props) => props.primaryColor};
  }
  button {
    font-family: ${(props) => props.primaryFont};
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
                    <LinkedInIcon fill={getThemeStyle(arcSite)['primary-color']} title="LinkedIn" description="Connect on LinkedIn" />
                  </a>
                );
                break;
              case 'twitter':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <TwitterIcon fill={getThemeStyle(arcSite)['primary-color']} title="Twitter" description="Connect on Twitter" />
                  </a>
                );
                break;
              case 'instagram':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <InstagramIcon fill={getThemeStyle(arcSite)['primary-color']} title="Instagram" description="Connect on Instagram" />
                  </a>
                );
                break;
              case 'facebook':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <FacebookIcon fill={getThemeStyle(arcSite)['primary-color']} title="Facebook" description="Connect on Facebook" />
                  </a>
                );
                break;
              case 'reddit':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <RedditIcon fill={getThemeStyle(arcSite)['primary-color']} title="Reddit" description="Connect on Reddit" />
                  </a>
                );
                break;
              case 'youtube':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener" id="link-social-youtube">
                    <YoutubeIcon fill={getThemeStyle(arcSite)['primary-color']} title="YouTube" description="Connect on YouTube" />
                  </a>
                );
                break;
              case 'medium':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <MediumIcon fill={getThemeStyle(arcSite)['primary-color']} title="Medium" description="Connect on Medium" />
                  </a>
                );
                break;
              case 'tumblr':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <TumblrIcon fill={getThemeStyle(arcSite)['primary-color']} title="Tumblr" description="Connect on Tumblr" />
                  </a>
                );
                break;
              case 'pinterest':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <PinterestIcon fill={getThemeStyle(arcSite)['primary-color']} title="Pinterest" description="Connect on Pinterest" />
                  </a>
                );
                break;
              case 'snapchat':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <SnapchatIcon fill={getThemeStyle(arcSite)['primary-color']} title="Snapchat" description="Connect on Snapchat" />
                  </a>
                );
                break;
              case 'whatsapp':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <WhatsAppIcon fill={getThemeStyle(arcSite)['primary-color']} title="WhatsApp" description="Connect on WhatsApp" />
                  </a>
                );
                break;
              case 'soundcloud':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <SoundCloudIcon fill={getThemeStyle(arcSite)['primary-color']} title="SoundCloud" description="Listen on SoundCloud" />
                  </a>
                );
                break;
              case 'rss':
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <RssIcon fill={getThemeStyle(arcSite)['primary-color']} title="RSS" description="Subscribe to RSS feed" />
                  </a>
                );
                break;
              default:
                socialButton = (
                  <a href={socialLink.url} target="_blank" rel="noreferrer noopener">
                    <EnvelopeIcon fill={getThemeStyle(arcSite)['primary-color']} title="Email" description="Send an email" />
                  </a>
                );
                break;
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
              {/* there will always be a description via conditional on 52 */}
              <p>{author.description}</p>
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
