import AdUnitLog from './index';

const MOCK_ADUNIT_1 = {
  id: 'arcad_9071',
  slotName: 'news',
  adType: 'leaderboard_large',
  adClass: '728x90',
  display: 'all',
};

const MOCK_ADUNIT_2 = {
  id: 'arcad_5530',
  slotName: 'news',
  adType: 'right_rail_cube',
  adClass: '300x250',
  display: 'desktop',
};

const MOCK_ADUNIT_3 = {
  id: 'arcad_3055',
  slotName: 'news',
  adType: 'right_rail_cube',
  adClass: '300x250',
  display: 'desktop',
};

describe('AdUnitLog', () => {
  beforeEach(() => {
    AdUnitLog.instance = undefined;
  });

  it('uses same instance for each initialization', () => {
    const log1 = AdUnitLog.getInstance();
    const log2 = AdUnitLog.getInstance();
    expect(AdUnitLog.instance).toBeDefined();
    expect(log1).toBeDefined();
    expect(log2).toBeDefined();
    expect(log1).toEqual(log2);
  });

  it('has empty log upon initialization', () => {
    const log = AdUnitLog.getInstance();
    expect(log).toBeDefined();
    expect(AdUnitLog.instance).toBeDefined();
    expect(typeof log.log).toEqual('object');
    expect(Object.keys(log.log)).toEqual([]);
  });

  it('adds single ad instances to log', () => {
    const log = AdUnitLog.getInstance();
    log.add(MOCK_ADUNIT_1);
    log.add(MOCK_ADUNIT_2);
    expect(Object.keys(log.log)).toHaveLength(2);
  });

  it('adds duplicate ad instances to log', () => {
    const log = AdUnitLog.getInstance();
    log.add(MOCK_ADUNIT_1);
    log.add(MOCK_ADUNIT_2);
    log.add(MOCK_ADUNIT_2);
    expect(Object.keys(log.log)).toHaveLength(2);
  });

  it('adds two of same type ad unit to log', () => {
    const log = AdUnitLog.getInstance();
    log.add(MOCK_ADUNIT_1);
    log.add(MOCK_ADUNIT_2);
    log.add(MOCK_ADUNIT_3);
    expect(Object.keys(log.log)).toHaveLength(2);
    expect(log.log[MOCK_ADUNIT_1.adType]).toHaveLength(1);
    expect(log.log[MOCK_ADUNIT_2.adType]).toHaveLength(2);
  });

  it('returns correct ad position', () => {
    const log = AdUnitLog.getInstance();
    expect(Object.keys(log.log)).toHaveLength(0);
    log.add(MOCK_ADUNIT_1);
    const adUnitPosition1 = log.getPosition({
      adType: MOCK_ADUNIT_1.adType,
      id: MOCK_ADUNIT_1.id,
    });
    expect(adUnitPosition1).toEqual(1);
    log.add(MOCK_ADUNIT_2);
    const adUnitPosition2 = log.getPosition({
      adType: MOCK_ADUNIT_2.adType,
      id: MOCK_ADUNIT_2.id,
    });
    expect(adUnitPosition2).toEqual(1);
    log.add(MOCK_ADUNIT_3);
    const adUnitPosition3 = log.getPosition({
      adType: MOCK_ADUNIT_3.adType,
      id: MOCK_ADUNIT_3.id,
    });
    expect(adUnitPosition3).toEqual(2);
    expect(Object.keys(log.log)).toHaveLength(2);
  });

  it('returns ad position of zero when no matching config added', () => {
    const log = AdUnitLog.getInstance();
    expect(Object.keys(log.log)).toHaveLength(0);
    const adUnitPosition1 = log.getPosition({
      adType: MOCK_ADUNIT_1.adType,
      id: MOCK_ADUNIT_1.id,
    });
    expect(adUnitPosition1).toEqual(0);
  });
});
