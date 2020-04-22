import React, { Fragment } from 'react';
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
} from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import { resizerURL } from 'fusion:environment';
import constructSocialURL from './shared/constructSocialURL';


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

const MediaLinksStyled = styled(LinkSVGHover)``;

const renderAuthorInfo = (author, arcSite) => {
  const { image: { url = '', alt_text: altText = '' }, image, name } = author;

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
          resizerURL={resizerURL}
        />
      ) : null
  );
};

const AuthorBio = () => {
  const { globalContent: content, arcSite } = useFusionContext();
  const { credits = {} } = content;
  const { by = [] } = credits;

  // Generate a list of author components
  const authors = by.reduce((authorList, author) => {
    const { additional_properties: additionalProperties } = author;
    const { original } = additionalProperties;

    // If the author doesn't have a description, then do not add them to the list
    // Also check for their bio, which means that they are a staff
    if (
      author.description
            && author.description.length > 0
            && original.bio
            && original.bio.length > 0
    ) {
      // A loop to generate the list of social media links.
      // If no url is provided, then the social link will be skipped.
      const socialLinks = author.social_links && author.social_links.length > 0
        ? author.social_links.reduce((result, socialLink) => {
          if (socialLink.site && socialLink.url && socialLink.url.length > 0) {
            let socialButton;
            const constructedURL = constructSocialURL(socialLink.site, socialLink.url);

            switch (socialLink.site) {
              case 'linkedin':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <LinkedInIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="LinkedIn"
                      description="Connect on LinkedIn"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'twitter':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <TwitterIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Twitter"
                      description="Connect on Twitter"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'instagram':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <InstagramIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Instagram"
                      description="Connect on Instagram"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'facebook':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <FacebookIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Facebook"
                      description="Connect on Facebook"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'reddit':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <RedditIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Reddit"
                      description="Connect on Reddit"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'youtube':
                socialButton = (
                  <MediaLinksStyled
                    href={constructedURL}
                    target="_blank"
                    rel="noreferrer noopener"
                    id="link-social-youtube"
                    primaryColor={getThemeStyle(arcSite)['primary-color']}
                  >
                    <YoutubeIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="YouTube"
                      description="Connect on YouTube"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'medium':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <MediumIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Medium"
                      description="Connect on Medium"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'tumblr':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <TumblrIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Tumblr"
                      description="Connect on Tumblr"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'pinterest':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <PinterestIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Pinterest"
                      description="Connect on Pinterest"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'snapchat':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <SnapchatIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Snapchat"
                      description="Connect on Snapchat"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'whatsapp':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <WhatsAppIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="WhatsApp"
                      description="Connect on WhatsApp"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'soundcloud':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <SoundCloudIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="SoundCloud"
                      description="Listen on SoundCloud"
                    />
                  </MediaLinksStyled>
                );
                break;
              case 'rss':
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <RssIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="RSS"
                      description="Subscribe to RSS feed"
                    />
                  </MediaLinksStyled>
                );
                break;
              default:
                socialButton = (
                  <MediaLinksStyled href={constructedURL} target="_blank" rel="noreferrer noopener" primaryColor={getThemeStyle(arcSite)['primary-color']}>
                    <EnvelopeIcon
                      fill={getThemeStyle(arcSite)['primary-color']}
                      title="Email"
                      description="Send an email"
                    />
                  </MediaLinksStyled>
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
