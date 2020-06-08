import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context/ServicesContext';

export function useAnjSupply(period) {
  const services = useContext(ServicesContext);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    services.anjSupply
      .timeseries(period)
      .then((timeseries) => {
        setState({ loading: false, error: null, data: timeseries });
      })
      .catch((error) => {
        setState({ loading: false, error: error, data: null });
      });
  }, [services.anjSupply, period]);

  return state;
}
