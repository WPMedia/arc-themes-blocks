import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import getTranslatedPhrases from 'fusion:intl';
import getThemeStyle from 'fusion:themes';
import {
  EnvelopeIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  RssIcon,
  RedditIcon,
  LinkedInIcon,
  YoutubeIcon,
  MediumIcon,
  TumblrIcon,
  PinterestIcon,
  SnapchatIcon,
  WhatsAppIcon,
  SoundCloudIcon,
  Image,
} from '@wpmedia/engine-theme-sdk';
import './full-author-bio.scss';
import constructSocialURL from './shared/constructSocialURL';

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
  linkedin: <LinkedInIcon
    title="LinkedIn"
    description="Connect on LinkedIn"
  />,
  reddit: <RedditIcon
    title="Reddit"
    description="Connect on Reddit"
  />,
  youtube: <YoutubeIcon
    title="YouTube"
    description="Connect on YouTube"
  />,
  medium: <MediumIcon
    title="Medium"
    description="Connect on Medium"
  />,
  tumblr: <TumblrIcon
    title="Tumblr"
    description="Connect on Tumblr"
  />,
  pinterest: <PinterestIcon
    title="Pinterest"
    description="Connect on Pinterest"
  />,
  snapchat: <SnapchatIcon
    title="Snapchat"
    description="Connect on Snapchat"
  />,
  whatsapp: <WhatsAppIcon
    title="WhatsApp"
    description="Connect on WhatsApp"
  />,
  soundcloud: <SoundCloudIcon
    title="SoundCloud"
    description="Listen on SoundCloud"
  />,
};

const FullAuthorBio = () => {
  const { globalContent: content, arcSite } = useFusionContext();
  const { locale = 'en', shouldCompressImageParams } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

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
            <Image
              compressedThumborParams={shouldCompressImageParams}
              url={content.authors[0].image}
              alt="Author photo"
              smallWidth={158}
              smallHeight={158}
              mediumWidth={158}
              mediumHeight={158}
              largeWidth={158}
              largeHeight={158}
              resizedImageOptions={content.authors[0].resized_params}
              resizerURL={getProperties(arcSite)?.resizerURL}
              breakpoints={getProperties(arcSite)?.breakpoints}
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
            <strong>{phrases.t('full-author-bio-block.connect-text')}</strong>
          </p>
          <div className="social-items">
            {
              socials.map((item) => (
                <a
                  className={`social-column ${item}`}
                  key={item}
                  href={constructSocialURL(item, content.authors[0][item])}
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
