import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context/ServicesContext';

export function useAntMetrics() {
  const services = useContext(ServicesContext);
  const [state, setState] = useState({ loading: true, error: null, metrics: null });

  useEffect(() => {
    if (!state.metrics) {
      services.coingecko
        .antMetrics()
        .then((metrics) => {
          setState({
            loading: false,
            error: null,
            metrics: metrics,
          });
        })
        .catch((error) => {
          setState({
            loading: false,
            error: error,
            metrics: null,
          });
        });
    }
  }, [services, state.metrics]);

  return state;
}
