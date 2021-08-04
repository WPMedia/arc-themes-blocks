import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import getTranslatedPhrases from 'fusion:intl';
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
  LazyLoad,
  isServerSide,
  constructSocialURL,
} from '@wpmedia/engine-theme-sdk';
import { PrimaryFont, SecondaryFont } from '@wpmedia/shared-styles';
import './full-author-bio.scss';

const logos = {
  email: <EnvelopeIcon />,
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  rss: <RssIcon />,
  linkedin: <LinkedInIcon />,
  reddit: <RedditIcon />,
  youtube: <YoutubeIcon />,
  medium: <MediumIcon />,
  tumblr: <TumblrIcon />,
  pinterest: <PinterestIcon />,
  snapchat: <SnapchatIcon />,
  whatsapp: <WhatsAppIcon />,
  soundcloud: <SoundCloudIcon />,
};

const FullAuthorBioItem = () => {
  const { globalContent: content, arcSite } = useFusionContext();
  const { locale = 'en' } = getProperties(arcSite);
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
                url={content.authors[0].image}
                alt={(content.authors[0].byline) ? content.authors[0].byline : ''}
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
          <PrimaryFont
            as="div"
            className="author-content"
          >
            {
              (content.authors[0].byline) ? (
                <h1 className="author-name">{content.authors[0].byline}</h1>
              ) : null
            }
            {
              (content.authors[0].role) ? (
                <h2 className="author-title h4-primary">{content.authors[0].role}</h2>
              ) : null
            }
            {
              (content.authors[0].bio || content.authors[0].longBio) ? (
                <SecondaryFont className="author-bio">
                  {content.authors[0].longBio || content.authors[0].bio}
                </SecondaryFont>
              ) : null
            }
          </PrimaryFont>
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
                  title={phrases.t(`full-author-bio-block.social-${item.toLowerCase()}`)}
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

const FullAuthorBio = ({ customFields = {} }) => {
  const { isAdmin } = useFusionContext();
  if (customFields.lazyLoad && isServerSide() && !isAdmin) { // On Server
    return null;
  }
  return (
    <LazyLoad enabled={customFields.lazyLoad && !isAdmin}>
      <FullAuthorBioItem customFields={{ ...customFields }} />
    </LazyLoad>
  );
};

FullAuthorBio.label = 'FullAuthorBio – Arc Block';

FullAuthorBio.propTypes = {
  customFields: PropTypes.shape({
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

export default FullAuthorBio;
