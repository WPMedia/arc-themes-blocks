const React = require('react');
const { render } = require('enzyme');

describe('Given the display time from ANS, it should convert to the proper timezone format we want', () => {
  it('should return proper long form with correctly converted timezone (mocked timezone is in CDT)', () => {
    const { default: ArticleDate } = require('./default');
    const display_date = '2019-08-11T16:45:33.209Z';
    const globalContent = { display_date };
    const customFields = { blockDisplay: true }
    const wrapper = render(<ArticleDate globalContent={globalContent} customFields={customFields} />);

    const testDate = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'America/Chicago', // Default to EST if no timezone is provided in env
      timeZoneName: 'short',
    }).format(new Date(display_date))
      .replace(/(,)(.*?)(,)/, '$1$2 at')
      .replace('PM', 'p.m.')
      .replace('AM', 'a.m.');

    expect(wrapper.text()).toEqual(testDate);
  });

  it('should return a blank string if the display_time is an invalid timestring', () => {
    const { default: ArticleDate } = require('./default');
    const display_date = 'invalid time string';
    const globalContent = { display_date };
    const customFields = { blockDisplay: true }

    const wrapper = render(<ArticleDate globalContent={globalContent} customFields={customFields} />);

    expect(wrapper.text()).toEqual('');
  });
})
