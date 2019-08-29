import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import './date.scss';

@Consumer
class ArticleDate extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content } = this.props;

    const { display_date: dateString } = content;

    // Convert the time to browser's local time using the ECMAScript Internationalization API
    // Browser support found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const displayDate = (dateString && Date.parse(dateString)) // check if it's a valid time string
      ? new Date(dateString)
        .toLocaleString('default', {
          year: 'numeric',
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        }).replace(/(,)(.*?)(,)/, '$1$2 at')
        .replace('PM', 'p.m.')
        .replace('AM', 'a.m.')
      : '';

    this.state = { displayDate };
  }

  render() {
    const { displayDate } = this.state;

    return (
      <div key={displayDate} className="date">
        {displayDate}
      </div>
    );
  }
}

export default ArticleDate;
