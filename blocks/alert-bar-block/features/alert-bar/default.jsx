/* eslint-disable camelcase */
import React, { Component } from 'react';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import PropTypes from 'prop-types';

import { CloseIcon } from '@wpmedia/engine-theme-sdk';

import { readCookie, saveCookie } from './cookies';

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

    this.alertRef = React.createRef();

    if (typeof window !== 'undefined') {
      this.cookie = readCookie();
      this.state = {
        content: cached,
        visible: this.checkAlertVisible(cached),
        hidden: true,
      };
      fetched.then(this.updateContent);
    } else {
      this.state = {
        content: cached,
        visible: false,
        hidden: true,
      };
    }
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
      fetched.then(this.updateContent);
    }, 120000);

    // need to delay a bit the first render, to let the browser settle the layout
    // or the initial animation will now execute
    window.setTimeout(this.showAlert, 500);

    const { visible } = this.state;
    this.engageAlert(visible);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { visible, hidden } = this.state;
    if ((visible !== prevState.visible) || (hidden !== prevState.hidden)) {
      if (visible) {
        this.engageAlert();
      } else {
        this.disengageAlert();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  showAlert = () => {
    this.setState({ hidden: false });
  }

  engageAlert = () => {
    if (!this.alertRef.current) {
      return;
    }
    // the has-alert class is added to the page-header ONLY if the alert-bar
    // is inside it. if not, nothing is needed
    const header = this.alertRef.current.closest('.page-header');
    if (!header) {
      return;
    }

    header.classList.add('has-alert');
  }

  disengageAlert = () => {
    const header = document.body.getElementsByClassName('page-header')[0];
    if (!header) {
      return;
    }
    header.classList.remove('has-alert');
  }

  updateContent = (content) => {
    this.cookie = readCookie();
    const isAlertVisible = this.checkAlertVisible(content);
    this.setState({ content, visible: isAlertVisible });
  }

  checkAlertVisible = (content) => {
    const elements = content?.content_elements;
    const hasAlert = elements?.length > 0;
    return hasAlert
      ? elements?.[0].headlines?.basic !== this.cookie
      : false;
  }

  hideAlert = () => {
    const { content = {} } = this.state;
    const story = content?.content_elements?.[0]?.headlines?.basic;
    saveCookie(story);
    this.setState({ visible: false });
  }

  render() {
    const { content = {}, visible, hidden } = this.state;

    if (hidden) {
      return null;
    }

    const { arcSite, customFields } = this.props;
    const { ariaLabel } = customFields;
    const { content_elements: elements = [] } = content;
    const article = elements[0] || {};
    const { websites = {}, headlines = {} } = article;
    const { website_url: websiteURL = '' } = websites[arcSite] || {};

    return (
      !!content?.content_elements?.length && visible && (
        <nav
          className="alert-bar"
          ref={this.alertRef}
          aria-label={ariaLabel || 'Breaking News Alert'}
        >
          <AlertBarLink
            href={websiteURL}
            className="article-link"
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          >
            {headlines.basic}
          </AlertBarLink>
          <button type="button" onClick={this.hideAlert}>
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
    ariaLabel: PropTypes.string.tag({
      label: 'Aria-label',
      default: 'Breaking News Alert',
    }),
  }),
};

export default AlertBar;
