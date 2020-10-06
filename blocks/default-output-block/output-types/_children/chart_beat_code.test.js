import chartBeatCode from './chart_beat_code';

describe('ChartBeat code', () => {
  it('must not render if accountId missing', () => {
    expect(chartBeatCode(null, 'a')).toBeFalsy();
    expect(chartBeatCode(undefined, 'a')).toBeFalsy();
  });

  it('must not render if Domain missing', () => {
    expect(chartBeatCode(1)).toBeFalsy();
    expect(chartBeatCode(1, null)).toBeFalsy();
    expect(chartBeatCode(1, undefined)).toBeFalsy();
  });

  it('must render if both values present', () => {
    expect(chartBeatCode(1, 'a')).toBeTruthy();
  });
});
