import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import PropTypes from '@arc-fusion/prop-types';

import { CloseIcon } from '@wpmedia/engine-theme-sdk';
import { PrimaryFont } from '@wpmedia/shared-styles';

import { readCookie, saveCookie } from './cookies';

import './alert-bar.scss';

export const AlertBarPresentational = (props) => {
  const {
    alertRef,
    barAriaLabel,
    closeAriaLabel,
    hideAlertHandler,
    headline,
    filledIn,
    websiteURL,
  } = props;

  if (!filledIn) {
    return <div className="alert-bar--empty" />;
  }

  return (
    <nav
      className="alert-bar"
      ref={alertRef}
      aria-label={barAriaLabel}
    >
      <PrimaryFont
        href={websiteURL}
        className="article-link"
        as="a"
      >
        {headline}
      </PrimaryFont>
      <button
        type="button"
        onClick={hideAlertHandler}
        aria-label={closeAriaLabel}
      >
        <CloseIcon className="close" fill="white" />
      </button>
    </nav>
  );
};

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
    this.phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');

    if (typeof window !== 'undefined') {
      this.cookie = readCookie();
      this.state = {
        content: cached,
        visible: this.checkAlertVisible(cached),
      };
      fetched.then(this.updateContent);
    } else {
      this.state = {
        content: cached,
        visible: false,
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

    const { visible } = this.state;
    this.engageAlert(visible);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { visible } = this.state;
    if ((visible !== prevState.visible)) {
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
    const { content = {}, visible } = this.state;

    const { arcSite, customFields = {} } = this.props;
    const { ariaLabel } = customFields;

    const { content_elements: elements = [] } = content;
    const article = elements[0] || {};
    const { websites = {}, headlines = {} } = article;
    const { website_url: websiteURL = '' } = websites[arcSite] || {};

    const { basic: basicHeadline = '' } = headlines;

    const showFilledInAlertBar = !!content?.content_elements?.length && visible && basicHeadline !== '';

    return (
      <AlertBarPresentational
        alertRef={this.alertRef}
        barAriaLabel={ariaLabel || this.phrases.t('alert-bar-block.element-aria-label')}
        closeAriaLabel={this.phrases.t('alert-bar-block.close-button')}
        filledIn={showFilledInAlertBar}
        headline={basicHeadline}
        hideAlertHandler={this.hideAlert}
        websiteURL={websiteURL}
      />
    );
  }
}

AlertBar.label = 'Alert Bar – Arc Block';

AlertBar.icon = 'alarm-bell-ring';

AlertBar.propTypes = {
  customFields: PropTypes.shape({
    ariaLabel: PropTypes.string.tag({
      label: 'Aria-label',
      defaultValue: 'Breaking News Alert',
      description: 'The label is provided to assistive technologies to provide it with a unique name for the breaking news nav landmark - defaults to "Breaking News Alert" if left blank',
    }),
  }),
};

export default AlertBar;
