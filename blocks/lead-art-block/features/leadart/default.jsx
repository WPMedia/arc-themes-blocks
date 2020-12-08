/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import styled from 'styled-components';
import VideoPlayer from '@wpmedia/video-player-block';
import {
  Gallery, ImageMetadata, Image, Lightbox,
} from '@wpmedia/engine-theme-sdk';
import './leadart.scss';
import FullscreenIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/FullscreenIcon';

const LeadArtWrapperDiv = styled.div`
  figcaption {
    font-family: ${(props) => props.primaryFont};
  }
`;

const LeadArtWrapperFigure = styled.figure`
  figcaption {
    font-family: ${(props) => props.primaryFont};
  }
`;

/**
 * @file LeadArt is a React Class Component
 * @summary React component for displaying an image along with a control to present the image in a
 * lightbox (see the lightbox component  in the +shared directory).
 * @extends Component
 */
@Consumer
class LeadArt extends Component {
  constructor(props) {
    super(props);
    const { globalContent: content, customFields, arcSite } = this.props;
    this.phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');
    this.state = {
      isOpen: false,
      enableZoom: customFields.enableZoom || false,
      buttonLabel: customFields.buttonLabel || this.phrases.t('global.gallery-expand-button'),
      showCredit: customFields.showCredit || false,
      content,
    };

    this.imgRef = React.createRef();
    this.handleCompressedImageParams = getProperties(arcSite)?.shouldCompressImageParams;
  }

  lightboxImgHandler() {
    const imgParentElm = this.imgRef.current;
    const imgElm = imgParentElm.querySelector('img');
    if (imgElm) {
      // this is where it's getting the resized lightbox img
      return imgElm.dataset.lightbox;
    }
    return '';
  }

  render() {
    const {
      enableZoom, isOpen, buttonPosition, buttonLabel, showCredit, content,
    } = this.state;

    const { arcSite } = this.props;

    if (content.promo_items && (content.promo_items.lead_art || content.promo_items.basic)) {
      const lead_art = (content.promo_items.lead_art || content.promo_items.basic);
      let lightbox = null;
      let caption = null;

      if (lead_art.type === 'raw_html') {
        if (buttonPosition !== 'hidden') {
          // this could be figure and figcaption, a react component
          const mainContent = (
            <>
              <div dangerouslySetInnerHTML={{ __html: lead_art.content }} />
            </>
          );
          lightbox = (
            <>
              {isOpen && (
                <Lightbox
                  mainSrc={mainContent}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  showImageCaption="false"
                  enableZoom={enableZoom}
                />
              )}
            </>
          );
        }

        return (
          <LeadArtWrapperDiv className="lead-art-wrapper" primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
            <div
              className="innerContent"
              dangerouslySetInnerHTML={{ __html: lead_art.content }}
            />
            {lightbox}
          </LeadArtWrapperDiv>
        );
      } if (lead_art.type === 'video') {
        return <VideoPlayer embedMarkup={lead_art.embed_html} />;
      } if (lead_art.type === 'image') {
        if (buttonPosition !== 'hidden') {
          lightbox = (
            <>
              {isOpen && (
                <Lightbox
                  mainSrc={this.lightboxImgHandler()}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  showImageCaption={showCredit}
                  imageCaption={lead_art.caption}
                  enableZoom={enableZoom}
                />
              )}
            </>
          );
        }

        caption = (
          <ImageMetadata
            subtitle={lead_art.subtitle}
            caption={lead_art.caption}
            credits={lead_art.credits}
          />
        );

        return (
          <LeadArtWrapperFigure
            className="lead-art-wrapper"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          >
            <button
              type="button"
              className="btn-full-screen"
              onClick={() => this.setState({ isOpen: true })}
            >
              <FullscreenIcon width="100%" height="100%" fill="#6B6B6B" />
              {buttonLabel}
            </button>
            <div ref={this.imgRef}>
              <Image
                compressedThumborParams={this.handleCompressedImageParams}
                url={lead_art.url}
                alt={lead_art.alt_text}
                smallWidth={800}
                smallHeight={0}
                mediumWidth={800}
                mediumHeight={0}
                largeWidth={800}
                largeHeight={0}
                lightBoxWidth={1600}
                lightBoxHeight={0}
                breakpoints={getProperties(arcSite)?.breakpoints}
                resizerURL={getProperties(arcSite)?.resizerURL}
                resizedImageOptions={lead_art.resized_params}
              />
            </div>
            {lightbox}
            {caption && (
              <figcaption>
                {caption}
              </figcaption>
            )}

          </LeadArtWrapperFigure>
        );
      } if (lead_art.type === 'gallery') {
        return (
          <Gallery
            galleryElements={lead_art.content_elements}
            resizerURL={getProperties(arcSite)?.resizerURL}
            ansId={lead_art._id}
            ansHeadline={lead_art.headlines.basic ? lead_art.headlines.basic : ''}
            expandPhrase={this.phrases.t('global.gallery-expand-button')}
            autoplayPhrase={this.phrases.t('global.gallery-autoplay-button')}
            pausePhrase={this.phrases.t('global.gallery-pause-autoplay-button')}
            pageCountPhrase={(current, total) => this.phrases.t('global.gallery-page-count-text', { current, total })}
          />
        );
      }
      return null;
    }
    return null;
  }
}

LeadArt.label = 'Lead Art – Arc Block';

LeadArt.defaultProps = {
  customFields: {
    enableZoom: false,
    buttonLabel: 'Full Screen',
    showCredit: false,
  },
};

LeadArt.propTypes = {
  customFields: PropTypes.shape({
    buttonLabel: PropTypes.string,
    enableZoom: PropTypes.bool,
    showCredit: PropTypes.bool,
    inheritGlobalContent: PropTypes.bool,
  }),
};

export default LeadArt;
