/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import { CloseIcon } from '@wpmedia/engine-theme-sdk';

import './alert-bar.scss';

const AlertBarLink = styled.a`
  font-family: ${(props) => props.primaryFont};
`;
@Consumer
class AlertBar extends Component {
  constructor(props) {
    super(props);
    const { arcSite, customFields } = this.props;
    const { cached, fetched } = this.getContent({
      sourceName: 'content-api-collections',
      query: {
        site: arcSite,
        _id: customFields?._id,
        from: 0,
        size: 1,
      },
    });

    this.state = {
      content: cached,
      visible: true,
    };
    fetched.then((content) => {
      const visible = content?.content_elements?.length > 0;
      this.setState({ content, visible });
    });
  }

  componentDidMount() {
    const { arcSite, customFields } = this.props;
    // The content source will always return an array with one story in it
    this.timeID = window.setInterval(() => {
      // Use getContent instead of fetchContent because it will otherwise only
      // return cached contents, as of March 25.
      const { fetched } = this.getContent({
        sourceName: 'content-api-collections',
        query: {
          site: arcSite,
          _id: customFields?._id,
          from: 0,
          size: 1,
        },
      });
      fetched.then((content) => {
        const visible = content?.content_elements?.length > 0;
        this.setState({ content, visible });
      });
    }, this.getRefreshInterval());
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  getRefreshInterval() {
    const { refreshInterval = 120 } = this.props?.customFields;
    return Math.max(refreshInterval, 120) * 1000;
  }

  render() {
    const { content = {}, visible } = this.state;
    const { arcSite } = this.props;
    const { content_elements: elements = [] } = content;
    const article = elements[0] || {};
    const { websites = {}, headlines = {} } = article;
    const { website_url: websiteURL = '' } = websites[arcSite] || {};

    return (
      !!content?.content_elements?.length && visible && (
        <nav className="alert-bar">
          <AlertBarLink
            href={websiteURL}
            className="article-link"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          >
            {headlines.basic}
          </AlertBarLink>
          <button type="button" onClick={() => this.setState({ visible: false })}>
            <CloseIcon className="close" fill="white" />
          </button>
        </nav>
      )
    );
  }
}

AlertBar.label = 'Alert Bar – Arc Block';

AlertBar.propTypes = {
  customFields: PropTypes.shape({
    refreshInterval: PropTypes.number.tag({
      label: 'Refresh Intervals (in seconds)',
      description: 'This is the frequency at which this feature will refresh. Default and minimum is 120 seconds.',
      default: 120, // Leaving this here for now but it seems to not be applying the default value
    }),
    _id: PropTypes.string.tag({
      label: 'Collections ID',
      description: 'ID of the Collections to be fetched from',
    }),
  }),
};

export default AlertBar;
