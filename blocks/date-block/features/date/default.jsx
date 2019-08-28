'use strict';

import React, { Component } from 'react';
import Consumer from 'fusion:consumer';

function cleanTimeString(timeString) {
  return timeString
    .replace('PM', 'p.m.')
    .replace('AM', 'a.m.');
}

@Consumer
class ArticleDate extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content } = this.props;
    const { display_date: dateString } = content;

    // Convert the time to browser's local time using the ECMAScript Internationalization API
    // Browser support found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const displayDate = (dateString && Date.parse(dateString))
      ? new Date(dateString).toLocaleDateString(
        'default',
        {
          dateStyle: 'long',
          timeStyle: 'long',
        },
      )
      : '';

    this.state = { displayDate };
  }

  componentDidMount() {
    const { displayDate } = this.state;
    const updatedDate = cleanTimeString(displayDate);

    this.setState({
      displayDate: updatedDate,
    });
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
