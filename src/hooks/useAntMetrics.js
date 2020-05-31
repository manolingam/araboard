import { useEffect, useState } from 'react';
import axios from 'axios';

const COINGECKO = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=aragon&sparkline=false';

export function useAntMetrics() {
  const [state, setState] = useState({ loading: true, error: null, metrics: null });

  useEffect(() => {
    axios.get(COINGECKO).then((response) => {
      const rawMetrics = response.data[0];
      const metrics = {
        price: rawMetrics.current_price,
        supply: rawMetrics.total_supply,
        marketCap: rawMetrics.market_cap
      };
      setState({
        loading: false,
        error: null,
        metrics: metrics,
      });
    });
  }, []);

  return state;
}
