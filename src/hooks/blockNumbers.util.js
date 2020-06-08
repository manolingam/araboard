import * as _ from 'lodash';
import { Period } from '../template/graphContainer/Period';

const BLOCKS_PER_DAY = (24 * 60 * 60) / 15;
const SPACES = 11;
const DAYS_PER_SPACE = 3;

export function blockNumbers(today, lastBlockNumber) {
  return _.times(SPACES).map((shift) => {
    const blockNumber = lastBlockNumber - shift * DAYS_PER_SPACE * BLOCKS_PER_DAY;
    const day = today.minus({ day: shift * DAYS_PER_SPACE });
    return {
      blockNumber,
      day,
      timestamp: day,
    };
  });
}

export function headOfPeriod(today, period) {
  const shift = totalDays(period);
  return today.minus({ day: shift });
}

export function totalDays(period) {
  switch (period) {
    case Period.M1:
      return 30;
    case Period.M3:
      return 90;
    case Period.M6:
      return 180;
    default:
      throw new Error(`Unknown period ${period}`);
  }
}

export function dayChunks(items) {
  return _.chunk(items, Math.floor(items.length / 10));
}

export function blockNumbersForPeriod(today, period, lastBlockNumber) {
  const daysNumber = totalDays(period);
  const allShifts = _.times(daysNumber).map((i) => -1 * i);
  const actualShifts = dayChunks(allShifts).map(_.max);
  return actualShifts.map((shift) => {
    const blockNumber = lastBlockNumber + shift * BLOCKS_PER_DAY;
    const day = today.minus({ day: -1 * shift });
    return {
      blockNumber,
      day,
      timestamp: day,
    };
  });
}
