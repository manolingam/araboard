import axios from 'axios';

const COINGECKO = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=aragon&sparkline=false';

export class CoingeckoService {
  constructor() {
    this._antMetrics = null;
  }

  async antMetrics() {
    if (this._antMetrics) {
      return this._antMetrics;
    } else {
      const response = await axios.get(COINGECKO);
      const rawMetrics = response.data[0];
      this._antMetrics = {
        price: rawMetrics.current_price,
        supply: rawMetrics.total_supply,
        marketCap: rawMetrics.market_cap,
      };
      return this._antMetrics;
    }
  }
}
