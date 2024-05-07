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

const getBillingCount = (rate) => {
  if(rate?.billingFrequency === 'OneTime' && rate?.duration === 'UntilCancelled') return rate?.billingFrequency;
  if(rate?.billingFrequency === 'OneTime' && rate?.duration !== 'UntilCancelled') return rate?.durationCount;
  return rate?.billingCount;
}

const getBillingFrequency = (rate) => {
  if (rate?.billingFrequency === 'OneTime' && rate?.duration) return rate?.duration;
  return rate?.billingFrequency;
}

const calculateDurationCycle = (rate) => {
  if (rate?.billingFrequency === 'OneTime' && rate?.duration) return durationInMillis(rate.duration);
  if (rate?.billingFrequency !== 'Hour' && rate?.billingFrequency && rate?.billingCount) return durationInMillis(rate.billingFrequency) * rate.billingCount;
  if (rate?.billingCount) return durationInMillis('Day') * rate.billingCount;
  return 0;
}

// On Staging we have some rates where the billingFrequency & duration is set to hours.
// For safety reasons the renewal engines will only touch an individual subscription once per day.
// BE is no handling for Hours for NextRenewalDate calculation. It execute default case and it adds Days.
export const getCyclesCurrentRate = rate => {
  let startNextCycle = 0;
  const durationRate = transformRateToDuration(rate);
  const durationCycle = calculateDurationCycle(rate);

  const billingCount = getBillingCount(rate);
    
  const billingFrequency = getBillingFrequency(rate);

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
  const rates = price?.rates || []
  // eslint-disable-next-line
  for (let i = 0; i < rates?.length; i += 1) {
    const cyclesCurrentRate = getCyclesCurrentRate(rates[i]);
    allCyclesInPrice = [...allCyclesInPrice, ...cyclesCurrentRate];
    if (rates[i].duration === 'UntilCancelled') {
      break;
    }
  }

  if (allCyclesInPrice.length <= currentCycle + 1) {
    return allCyclesInPrice[allCyclesInPrice.length - 1];
  } 
    return allCyclesInPrice[currentCycle];
  
};

export const getLocalDateString = (date) =>  new Date(date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'});