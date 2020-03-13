import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
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
    const { globalContent: content, customFields } = this.props;
    this.state = {
      isOpen: false,
      enableZoom: customFields.enableZoom || false,
      buttonLabel: customFields.buttonLabel || 'Full Screen',
      showCredit: customFields.showCredit || false,
      content,
    };

    this.imgRef = React.createRef();
  }

  lightboxImgHandler() {
    const imgParentElm = this.imgRef.current;
    const imgElm = imgParentElm.querySelector('img');
    if (imgElm) {
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
      // eslint-disable-next-line camelcase
      const lead_art = (content.promo_items.lead_art || content.promo_items.basic);
      let lightbox = null;
      let caption = null;

      if (lead_art.type === 'raw_html') {
        if (buttonPosition !== 'hidden') {
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
              />
            </div>
            {lightbox}
            {caption && (
              <figcaption>
                { caption }
              </figcaption>
            )}

          </LeadArtWrapperFigure>
        );
      } if (lead_art.type === 'gallery') {
        return <Gallery galleryElements={lead_art.content_elements} />;
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
