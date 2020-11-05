export default class AdUnitLog {
  static instance;

  static getInstance() {
    if (!AdUnitLog.instance) {
      AdUnitLog.instance = new AdUnitLog();
    }
    return this.instance;
  }

  constructor() {
    this.add = this.add.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.log = {};
  }

  add(adCfg) {
    const { id, adType: adKey } = adCfg;
    if (!this.log[adKey]) this.log[adKey] = [];
    const cfgExists = this.log[adKey].reduce((exists, next) => !!(
      next && next.id === id ? true : exists
    ), false);
    if (!cfgExists) this.log[adKey].push(adCfg);
  }

  getPosition({ adType, id }) {
    const adCfgs = this.log[adType] || [];
    let adCfg = null;
    adCfgs.forEach((cfg) => {
      if (cfg.id === id) adCfg = cfg;
    });
    return !adCfg ? 0 : (adCfgs.indexOf(adCfg) + 1);
  }
}
