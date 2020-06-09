import { totalDays } from '../hooks/blockNumbers.util';
import axios from 'axios';
import { DateTime } from 'luxon';
import * as _ from 'lodash';

function daysEndpoint(period) {
  const days = totalDays(period);
  return `https://api.coingecko.com/api/v3/coins/aragon/market_chart?vs_currency=usd&days=${days}`;
}

export class AntPriceService {
  constructor() {
    this._timeseriesCache = new Map();
  }

  async timeseries(period) {
    const found = this._timeseriesCache.get(period);
    if (found) {
      return found;
    } else {
      const endpoint = daysEndpoint(period);
      const response = await axios.get(endpoint);
      const data = response.data;
      const prices = data.prices.map((point) => {
        const timestamp = DateTime.fromSeconds(point[0] / 1000);
        const value = point[1];
        return {
          timestamp: timestamp.startOf('day'),
          value,
        };
      });
      const groupByDay = _.groupBy(prices, (point) => point.timestamp);
      let byDay = [];
      for (let group in groupByDay) {
        const timestamp = groupByDay[group][0].timestamp;
        const mean = _.meanBy(groupByDay[group], (point) => point.value);
        byDay.push({
          timestamp: timestamp,
          value: mean,
        });
      }
      this._timeseriesCache.set(period, byDay);
      return byDay;
    }
  }
}
