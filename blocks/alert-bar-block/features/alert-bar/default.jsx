import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import { CloseIcon } from '@wpmedia/engine-theme-sdk';

import './alert-bar.scss';

const AlertBarSpan = styled.span`
  a {
    font-family: ${(props) => props.primaryFont};
  }
`;
@Consumer
class AlertBar extends Component {
  constructor(props) {
    super(props);
    const { arcSite, customFields = {} } = this.props;
    let { refreshIntervals } = customFields;

    // It should be at minimum 30 seconds to make sure it doesn't overwhelm the content API
    refreshIntervals = (refreshIntervals && refreshIntervals >= 30) ? refreshIntervals : 30;

    const { cached, fetched } = this.getContent({
      sourceName: 'alert-bar-collections',
      query: {
        site: arcSite,
      },
    });

    this.state = {
      content: cached,
      arcSite,
      refreshIntervals,
      visible: true,
    };
    fetched.then((content) => {
      this.setState({ content });
    });
  }

  componentDidMount() {
    let { refreshIntervals = 30 } = this.state;
    const { arcSite } = this.state;
    // refreshIntervals should always be at least 30 so it doesn't overwhelm the calls to
    // the content api.
    refreshIntervals = (refreshIntervals < 30) ? 30 : refreshIntervals;

    // The content source will always return an array with one story in it
    window.setInterval(() => {
      const { fetched } = this.getContent({
        sourceName: 'alert-bar-collections',
        query: {
          site: arcSite,
        },
      });
      fetched.then((content) => {
        this.setState({ content });
      });
    }, (refreshIntervals * 1000));
  }

  render() {
    const {
      content = {},
      arcSite = '',
      visible = false,
    } = this.state;

    const { content_elements: elements = [] } = content;
    const article = elements[0] ? elements[0] : {};
    const { websites = {}, headlines = {} } = article;
    const { website_url: websiteURL = '' } = websites[arcSite] ? websites[arcSite] : {};

    return (
      (visible
        ? (
          <nav className="alert-bar">
            <AlertBarSpan primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
              <a href={websiteURL} className="article-link">{headlines.basic}</a>
            </AlertBarSpan>
            <button type="button" onClick={() => this.setState({ visible: false })}>
              <CloseIcon className="close" fill="white" />
            </button>
          </nav>
        )
        : null
      )
    );
  }
}

AlertBar.label = 'Alert Bar – Arc Block';

AlertBar.propTypes = {
  customFields: PropTypes.shape({
    refreshIntervals: PropTypes.number.isRequired.tag({
      label: 'Refresh Intervals (in seconds)',
      description: 'This is the frequency at which this feature will refresh. Default and minimum is 30 seconds.',
      default: 30,
    }),
  }),
};

export default AlertBar;
