import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import { LinkSVGHover } from '@wpmedia/news-theme-css/js/styled/linkHovers';
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
  LazyLoad,
} from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';

import constructSocialURL from './shared/constructSocialURL';

import './author-bio.scss';

/*
Testing: Unit tests are written to cover this block
*/

const AuthorBioStyled = styled.section`
  font-family: ${(props) => props.primaryFont};

  .authorName {
    color: ${(props) => props.primaryColor};
    font-family: ${(props) => props.primaryFont};
  }

  button {
    font-family: ${(props) => props.primaryFont};
  }
`;

const MediaLinksStyled = styled(LinkSVGHover)``;

export const getSocialLinkAriaLabel = (authorName = 'author', webService) => {
  if (!webService) return null;
  return (
    (webService.toLowerCase() === 'soundcloud' && `Listen to ${authorName} on SoundCloud`)
    || (webService.toLowerCase() === 'rss' && `Subscribe to ${authorName} RSS feed`)
    || (webService.toLowerCase() === 'email' && `Send an email to ${authorName}`)
    || `Connect with ${authorName} on ${webService}`
  );
};

const renderAuthorInfo = (author, arcSite) => {
  const {
    image: { url = '', alt_text: altText = '' },
    image,
    name,
    resized_params: resizedImageOptions,
  } = author;

  return (
    image && url
      ? (
        <Image
          url={url}
          alt={(altText || name)}
          smallWidth={84}
          smallHeight={0}
          mediumWidth={84}
          mediumHeight={0}
          largeWidth={84}
          largeHeight={0}
          breakpoints={getProperties(arcSite)?.breakpoints}
          resizerURL={getProperties(arcSite)?.resizerURL}
          resizedImageOptions={resizedImageOptions}
        />
      ) : null
  );
};

const AuthorBio = (props) => {
  const { globalContent: content, arcSite } = useFusionContext();
  const { credits = {} } = content;
  const { by = [] } = credits;
  const { customFields = {} } = props || {};
  const { lazyLoad = false } = customFields;

  // Generate a list of author components
  const authors = by.reduce((authorList, author) => {
    const { additional_properties: additionalProperties, name } = author;
    const { original } = additionalProperties;

    // If the author doesn't have a description, then do not add them to the list
    // Also check for their bio, which means that they are a staff
    if (
      author.description
            && author.description.length > 0
            && original
            && original.bio
            && original.bio.length > 0
    ) {
      // A loop to generate the list of social media links.
      // If no url is provided, then the social link will be skipped.
      const socialLinks = author.social_links && author.social_links.length > 0
        ? author.social_links.reduce((result, socialLink) => {
          if (socialLink.site && socialLink.url && socialLink.url.length > 0) {
            let socialButton;
            let linkTitle;
            const constructedURL = constructSocialURL(socialLink.site, socialLink.url);

            const MediaLink = ({ children, webService, ...otherProps }) => (
              <MediaLinksStyled
                href={constructedURL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={getSocialLinkAriaLabel(name, webService)}
                primaryColor={getThemeStyle(arcSite)['primary-color']}
                {...otherProps}
              >
                { children }
              </MediaLinksStyled>
            );

            switch (socialLink.site) {
              case 'linkedin':
                linkTitle = 'LinkedIn';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <LinkedInIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on LinkedIn"
                    />
                  </MediaLink>
                );
                break;
              case 'twitter':
                linkTitle = 'Twitter';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <TwitterIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Twitter"
                    />
                  </MediaLink>
                );
                break;
              case 'instagram':
                linkTitle = 'Instagram';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <InstagramIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Instagram"
                    />
                  </MediaLink>
                );
                break;
              case 'facebook':
                linkTitle = 'Facebook';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <FacebookIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Facebook"
                    />
                  </MediaLink>
                );
                break;
              case 'reddit':
                linkTitle = 'Reddit';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <RedditIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Reddit"
                    />
                  </MediaLink>
                );
                break;
              case 'youtube':
                linkTitle = 'YouTube';
                socialButton = (
                  <MediaLink webService={linkTitle} id="link-social-youtube">
                    <YoutubeIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on YouTube"
                    />
                  </MediaLink>
                );
                break;
              case 'medium':
                linkTitle = 'Medium';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <MediumIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Medium"
                    />
                  </MediaLink>
                );
                break;
              case 'tumblr':
                linkTitle = 'Tumblr';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <TumblrIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Tumblr"
                    />
                  </MediaLink>
                );
                break;
              case 'pinterest':
                linkTitle = 'Pinterest';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <PinterestIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Pinterest"
                    />
                  </MediaLink>
                );
                break;
              case 'snapchat':
                linkTitle = 'Snapchat';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <SnapchatIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on Snapchat"
                    />
                  </MediaLink>
                );
                break;
              case 'whatsapp':
                linkTitle = 'WhatsApp';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <WhatsAppIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Connect on WhatsApp"
                    />
                  </MediaLink>
                );
                break;
              case 'soundcloud':
                linkTitle = 'SoundCloud';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <SoundCloudIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Listen on SoundCloud"
                    />
                  </MediaLink>
                );
                break;
              case 'rss':
                linkTitle = 'RSS';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <RssIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Subscribe to RSS feed"
                    />
                  </MediaLink>
                );
                break;
              default:
                linkTitle = 'Email';
                socialButton = (
                  <MediaLink webService={linkTitle}>
                    <EnvelopeIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title={linkTitle}
                      description="Send an email"
                    />
                  </MediaLink>
                );
                break;
            }
            result.push(<Fragment key={socialLink.site}>{socialButton}</Fragment>);
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
            {renderAuthorInfo(author, arcSite)}
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

  if (authors.length === 0) {
    return null;
  }

  const AuthorBioRender = () => (
    <AuthorBioStyled
      className="author-bio"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      primaryColor={getThemeStyle(arcSite)['primary-color']}
    >
      {authors}
    </AuthorBioStyled>
  );

  return (
    <LazyLoad enabled={lazyLoad}>
      <AuthorBioRender />
    </LazyLoad>
  );
};

AuthorBio.propTypes = {
  customFields: PropTypes.shape({
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

AuthorBio.label = 'Short Author Bio – Arc Block';

export default AuthorBio;
