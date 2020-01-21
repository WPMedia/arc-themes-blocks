import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import VideoPlayer from '@arc-test-org/video-player-block';
import {
  Gallery, ImageMetadata, Image, Lightbox,
} from '@arc-test-org/engine-theme-sdk';
import './leadart.scss';
import fullScreenLogo from './images/full-screen.svg';


const LeadArtWrapperDiv = styled.div`
  figcaption {
    font-family: ${props => props.primaryFont};
  }
`;

const LeadArtWrapperFigure = styled.figure`
  figcaption {
    font-family: ${props => props.primaryFont};
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
            <React.Fragment>
              <div dangerouslySetInnerHTML={{ __html: lead_art.content }} />
            </React.Fragment>
          );
          lightbox = (
            <React.Fragment>
              {isOpen && (
                <Lightbox
                  mainSrc={mainContent}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  showImageCaption="false"
                  enableZoom={enableZoom}
                />
              )}
            </React.Fragment>
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
            <React.Fragment>
              {isOpen && (
                <Lightbox
                  mainSrc={this.lightboxImgHandler()}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  showImageCaption={showCredit}
                  imageCaption={lead_art.caption}
                  enableZoom={enableZoom}
                />
              )}
            </React.Fragment>
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
              <svg
                width="100%"
                height="100%"
                viewBox="2 2 20.5 20.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.602 15.955v4.65a.994.994 0 01-.996.997h-4.651c-.888 0-1.332-1.075-.706-1.702l1.503-1.503-4.451-4.452-4.452 4.456L9.353 19.9c.627.627.182 1.702-.706 1.702h-4.65A.994.994 0 013 20.606v-4.651c0-.889 1.075-1.333 1.702-.706l1.503 1.503 4.454-4.451-4.454-4.455-1.503 1.507C4.075 9.98 3 9.536 3 8.647v-4.65A.994.994 0 013.997 3h4.65c.888 0 1.333 1.075.706 1.702L7.85 6.206l4.451 4.45 4.452-4.455-1.504-1.499C14.623 4.075 15.067 3 15.955 3h4.65a.994.994 0 01.997.997v4.65c0 .889-1.075 1.333-1.702.706L18.397 7.85 13.943 12.3l4.454 4.455 1.503-1.503c.627-.63 1.702-.187 1.702.702z" fill="#6B6B6B" fillRule="nonzero" />
              </svg>
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
