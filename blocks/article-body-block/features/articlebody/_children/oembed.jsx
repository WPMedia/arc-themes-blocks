/* eslint-disable */
// TODO fix linting errors

//TODO: The css classes referenced here need to be defined...

import React from 'react'
import PropTypes from 'prop-types'
import EmbedWrapper from './embed-wrapper'


const Oembed = ({ element, content, isAmp, isLeadArt, metaValue }) => {
  // Need to put this in a function outside return so we can do switching logic
  const output = () => {
    switch (element.subtype) {
      case 'tweet':
      case 'twitter':
        if (isAmp) {
          const searchTerm = 'status/';
          const tweetid = element.raw_oembed._id.substring(element.raw_oembed._id.indexOf(searchTerm) + searchTerm.length);
          return (
            <div className={`oembed | margin_centered oembed-${element.subtype} ${responsiveClass} flex-container-row\ 
justify_center`}>
              <amp-twitter
                width='300'
                height='300'
                layout='responsive'
                data-tweetid={tweetid}
              />
            </div>
          )
        }
        return <EmbedWrapper html={element.raw_oembed.html} src="https://platform.twitter.com/widgets.js" />;
      case 'instagram':
        if (isAmp)
          return (
            <amp-instagram
              data-shortcode={shortCode}
              data-captioned
              layout='responsive'
              width='1'
              height='1'
            />
          );
        return <EmbedWrapper html={element.raw_oembed.html} src="https://www.instagram.com/embed.js" />;
      case 'youtube':
        if (isAmp) {
          const decodedURL = element.raw_oembed._id.replace('%3D', '=');
          const videoID = decodedURL.split('v=')[1];
          return (
            <amp-youtube
              width='1.7'
              height='1'
              layout='responsive'
              data-videoid={videoID}
            />
          )
        }
        return element.raw_oembed.html
          .replace(/src\s*=\s*"(.+?)"/, (matches, src) => `src="${src}${src.indexOf('?') !== -1 ? '&' : '?'}enablejsapi=1"`);
      case 'facebook':
        if (isAmp)
          return (
            <amp-facebook
              width={element.raw_oembed.width}
              height='310'
              layout='responsive'
              data-href={element.raw_oembed.url}
            />
          );
        return <EmbedWrapper html={element.raw_oembed.html} src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&amp;version=v3.3" />;
      case 'facebook-video':
        return <EmbedWrapper html={element.raw_oembed.html} src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&amp;version=v3.3" />;
      case 'vimeo':
        if (isAmp)
          return (
            <amp-vimeo
              width='1.7'
              height='1'
              layout='responsive'
              data-videoid={element.raw_oembed.video_id}
            />
          );
      default:
        return <EmbedWrapper html={element.raw_oembed.html} />
    }
  };

  // If element is a subtype of youtube or vimeo, and this is not an AMP page, add responsive video classes
  const responsiveClass = (['youtube', 'vimeo'].indexOf(element.subtype) !== -1 && !isAmp) ? 'responsive-embed-16x9 relative' : '';
  const marginClasses = !isLeadArt && !isAmp ? 'margin_top_md margin_bottom_md' : '';
  const cssClasses = `oembed-${element.subtype} ${responsiveClass} container_row ${marginClasses}`;
  const outputElement = output();

  if (typeof outputElement === 'string') {
    return <div className={cssClasses} dangerouslySetInnerHTML={{ __html: outputElement }} />
  }
  return (
    <div className={cssClasses}>
      {outputElement}
    </div>
  )
};

Oembed.propTypes = {
  element: PropTypes.object,
  isAmp: PropTypes.bool,
  isLeadArt: PropTypes.bool,
  content: PropTypes.object,
  metaValue: PropTypes.func
};

export default Oembed
