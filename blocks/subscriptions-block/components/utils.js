export const durationInMillis = duration => {
  switch (duration) {
    case 'Day':
      return 86400000;
    case 'Week':
      return 604800000;
    case 'Month':
      return 2592000000;
    case 'Year':
      return 31104000000;
    default:
      return 0;
  }
};

export const transformRateToDuration = ({ duration, durationCount = 0 }) => durationCount * durationInMillis(duration);

// On Staging we have some rates where the billingFrequency & duration is set to hours.
// For safety reasons the renewal engines will only touch an individual subscription once per day.
// BE is no handling for Hours for NextRenewalDate calculation. It execute default case and it adds Days.
export const getCyclesCurrentRate = rate => {
  let startNextCycle = 0;
  const durationRate = transformRateToDuration(rate);
  const durationCycle =
    rate?.billingFrequency === 'OneTime'
      ? durationInMillis(rate?.duration)
      : durationInMillis(rate?.billingFrequency !== 'Hour' ? rate?.billingFrequency : 'Day') *
        rate?.billingCount;
  const billingCount =
    rate?.billingFrequency === 'OneTime' && rate?.duration === 'UntilCancelled'
      ? rate?.billingFrequency
      : rate?.billingFrequency === 'OneTime' && rate?.duration !== 'UntilCancelled'
      ? rate?.durationCount
      : rate?.billingCount;
  const billingFrequency =
    rate?.billingFrequency === 'OneTime' && rate?.duration === 'UntilCancelled'
      ? rate?.duration
      : rate?.billingFrequency === 'OneTime' && rate?.duration !== 'UntilCancelled'
      ? rate?.duration
      : rate?.billingFrequency;

  const cyclesOnRate = [];

  while (startNextCycle < durationRate || rate.duration === 'UntilCancelled') {
    if (rate.duration === 'UntilCancelled') {
      cyclesOnRate.push({
        amount: rate.amount,
        startTime: 'UntilCancelled',
        endTime: 'UntilCancelled',
        billingCount,
        billingFrequency,
        duration: rate.duration,
        durationCount: rate.durationCount
      });
      break;
    } else if (!cyclesOnRate.length) {
        cyclesOnRate.push({
          amount: rate.amount,
          startTime: 1,
          endTime: durationCycle,
          billingCount,
          billingFrequency,
          duration: rate.duration,
          durationCount: rate.durationCount
        });
        startNextCycle = cyclesOnRate[cyclesOnRate.length - 1]?.endTime;
      } else {
        cyclesOnRate.push({
          amount: rate.amount,
          startTime: startNextCycle + 1,
          endTime: startNextCycle + durationCycle,
          billingCount,
          billingFrequency,
          duration: rate.duration,
          durationCount: rate.durationCount
        });
        startNextCycle = cyclesOnRate[cyclesOnRate.length - 1]?.endTime;
      }
  }
  return cyclesOnRate;
};

export const getNextRate = (currentCycle, price) => {
  let allCyclesInPrice = [];

  for (const rate in price.rates) {
    const cyclesCurrentRate = getCyclesCurrentRate(price.rates[rate]);
    allCyclesInPrice = [...allCyclesInPrice, ...cyclesCurrentRate];
    if (price.rates[rate].duration === 'UntilCancelled') {
      break;
    }
  }

  if (allCyclesInPrice.length <= currentCycle + 1) {
    return allCyclesInPrice[allCyclesInPrice.length - 1];
  } 
    return allCyclesInPrice[currentCycle];
  
};