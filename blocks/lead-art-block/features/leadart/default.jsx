import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Lightbox from '@arc-test-org/lightbox';
import Image from '@arc-test-org/image';
import './leadart.scss';
import fullScreenLogo from './images/full-screen.svg';

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
      buttonLabel: customFields.buttonLabel,
      buttonPosition: customFields.buttonPosition || 'bottom-right',
      showCredit: customFields.showCredit || false,
      content,
    };
  }

  render() {
    const {
      enableZoom, isOpen, buttonPosition, buttonLabel, showCredit, content,
    } = this.state;

    const style = {
      background: `url(${fullScreenLogo}) no-repeat center`,
    };


    if (content.promo_items && content.promo_items.lead_art) {
      // eslint-disable-next-line camelcase
      const { lead_art } = content.promo_items;
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
              <button
                type="button"
                style={style}
                onClick={() => this.setState({ isOpen: true })}
                className={`lead-art-fullscreen ${buttonPosition}`}
                title={buttonLabel}
                aria-label={buttonLabel}
              />
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
          <div className="lead-art-wrapper">
            <div
              className="innerContent"
              dangerouslySetInnerHTML={{ __html: lead_art.content }}
            />
            {lightbox}
          </div>
        );
      } if (lead_art.type === 'image') {
        if (buttonPosition !== 'hidden') {
          lightbox = (
            <React.Fragment>
              <button
                type="button"
                style={style}
                onClick={() => this.setState({ isOpen: true })}
                className={`lead-art-fullscreen ${buttonPosition}`}
                title={buttonLabel}
                aria-label={buttonLabel}
              />
              {isOpen && (
                <Lightbox
                  mainSrc={lead_art.url}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  showImageCaption={showCredit}
                  imageCaption={lead_art.caption}
                  enableZoom={enableZoom}
                />
              )}
            </React.Fragment>
          );
        }

        if (lead_art.caption && lead_art.caption.length > 0) {
          caption = (
            <figcaption>{lead_art.caption}</figcaption>
          );
        }


        return (
          <figure className="lead-art-wrapper">
            <Image
              url={lead_art.url}
              alt={lead_art.alt_text}
              smallWidth={800}
              smallHeight={0}
              mediumWidth={800}
              mediumHeight={0}
              largeWidth={800}
              largeHeight={0}
            />
            {lightbox}
            {caption}

          </figure>
        );
      }
      return null;
    }
    return null;
  }
}

LeadArt.defaultProps = {
  customFields: {
    enableZoom: false,
    buttonLabel: 'View Full Screen',
    buttonPosition: 'bottom-left',
    showCredit: false,
  },
};

LeadArt.propTypes = {
  customFields: PropTypes.shape({
    buttonPosition: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right', 'hidden']),
    buttonLabel: PropTypes.string,
    enableZoom: PropTypes.bool,
    showCredit: PropTypes.bool,
    inheritGlobalContent: PropTypes.bool,
  }),
};

export default LeadArt;
