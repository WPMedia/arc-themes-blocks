/* eslint-disable camelcase */
import React, { Component } from 'react';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import { CloseIcon } from '@wpmedia/engine-theme-sdk';

import './alert-bar.scss';

const AlertBarLink = styled.a`
  &&& {
    font-family: ${(props) => props.primaryFont};
  }
`;
@Consumer
class AlertBar extends Component {
  constructor(props) {
    super(props);
    const { arcSite } = this.props;
    const { cached, fetched } = this.getContent({
      sourceName: 'alert-bar-collections',
      query: {
        site: arcSite,
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
    const { arcSite } = this.props;
    // The content source will always return an array with one story in it
    this.timeID = window.setInterval(() => {
      // Use getContent instead of fetchContent because it will otherwise only
      // return cached contents, as of March 25.
      const { fetched } = this.getContent({
        sourceName: 'alert-bar-collections',
        query: {
          site: arcSite,
          from: 0,
          size: 1,
        },
      });
      fetched.then((content) => {
        const visible = content?.content_elements?.length > 0;
        this.setState({ content, visible });
      });
    }, 120000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
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

export default AlertBar;
