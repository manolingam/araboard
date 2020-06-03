import * as _ from 'lodash';

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
    };
  });
}
