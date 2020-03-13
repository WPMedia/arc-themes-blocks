import React, { Component } from 'react';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import { TIMEZONE } from 'fusion:environment';
import './date.scss';

const StyledTime = styled.time`
  font-family: ${(props) => props.primaryFont};
`;

@Consumer
class ArticleDate extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const {
      globalContent: {
        display_date: globalDateString,
      } = {},
      date,
    } = this.props;
    // Set dateString to date from globalContent
    // if it exists and date prop has not been passed to it
    // If it has a date prop then set dateString to the
    // date recieved from prop instead of the date from globalContent
    const dateString = date || globalDateString;
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

    this.state = { displayDate };
  }

  render() {
    const { displayDate } = this.state;
    const { arcSite, classNames } = this.props;
    return (
      <StyledTime key={displayDate} className={`date ${classNames}`} dateTime={displayDate} primaryFont={getThemeStyle(arcSite)['primary-font-family']}>
        {displayDate}
      </StyledTime>
    );
  }
}

ArticleDate.label = 'Date – Arc Block';

export default ArticleDate;
