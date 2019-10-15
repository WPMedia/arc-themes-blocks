import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import { TIMEZONE } from 'fusion:environment';
import PropTypes from 'prop-types';
import './date.scss';

@Consumer
class ArticleDate extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content, customFields } = this.props;

    const { display_date: dateString } = content;
    const { blockDisplay } = customFields;

    // Convert the time to browser's local time using the ECMAScript Internationalization API
    // Browser support found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const displayDate = (dateString && Date.parse(dateString)) // check if it's a valid time string
      ? new Intl.DateTimeFormat('en', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: (TIMEZONE && TIMEZONE !== '') ? TIMEZONE : undefined,
        timeZoneName: 'short',
      }).format(new Date(dateString))
        .replace(/(,)(.*?)(,)/, '$1$2 at')
        .replace('PM', 'p.m.')
        .replace('AM', 'a.m.')
      : '';

    this.state = { displayDate, blockDisplay };
  }

  render() {
    const { displayDate, blockDisplay } = this.state;
    const displayType = blockDisplay ? 'block' : 'inline';

    return (
      <time key={displayDate} className={`date-${displayType}`} dateTime={displayDate}>
        {displayDate}
      </time>
    );
  }
}
ArticleDate.propTypes = {
  customFields: PropTypes.shape({
    // eslint-disable-next-line react/no-typos
    blockDisplay: PropTypes.boolean,
  }),
};

export default ArticleDate;
