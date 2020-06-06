import axios from 'axios';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from "react";

const COINGECKO = 'https://api.coingecko.com/api/v3/coins/aragon/market_chart?vs_currency=usd&days=30';

export function useAntPrice() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  const fetchPrices = useCallback(() => {
    if (!state.error || !state.data) {
      axios
        .get(COINGECKO)
        .then((response) => {
          const data = response.data;
          const prices = data.prices.map((point) => {
            const timestamp = DateTime.fromSeconds(point[0] / 1000);
            const value = point[1];
            return {
              timestamp: timestamp.startOf('day'),
              value,
            };
          });
          setState({
            loading: false,
            error: null,
            data: prices,
          });
        })
        .catch((error) => {
          console.error(error)
          setState({
            loading: false,
            error: error,
            data: null,
          });
        });
    }
  }, [state.error, state.data])

  useEffect(() => {
    fetchPrices()
  }, [])

  return state;
}
