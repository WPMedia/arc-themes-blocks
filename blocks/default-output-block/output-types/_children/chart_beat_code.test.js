import chartBeatCode from './chart_beat_code';

describe('ChartBeat code', () => {
  it('must not render if both parameters are missing', () => {
    expect(chartBeatCode()).toBeFalsy();
    expect(chartBeatCode(null, null)).toBeFalsy();
    expect(chartBeatCode(undefined, undefined)).toBeFalsy();
    expect(chartBeatCode(null, undefined)).toBeFalsy();
    expect(chartBeatCode(undefined, null)).toBeFalsy();
  });

  it('must not render if accountId is missing', () => {
    expect(chartBeatCode(null, 'a')).toBeFalsy();
    expect(chartBeatCode(undefined, 'a')).toBeFalsy();
  });

  it('must not render if Domain missing', () => {
    expect(chartBeatCode(1)).toBeFalsy();
    expect(chartBeatCode(1, null)).toBeFalsy();
    expect(chartBeatCode(1, undefined)).toBeFalsy();
  });

  it('must render if both values are present', () => {
    expect(chartBeatCode(1, 'a')).toBeTruthy();
  });
});
