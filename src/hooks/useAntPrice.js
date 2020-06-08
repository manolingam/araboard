import { useContext, useEffect, useState } from 'react';
import { ServicesContext } from '../context/ServicesContext';

export function useAntPrice(period) {
  const services = useContext(ServicesContext);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    services.antPrice
      .timeseries(period)
      .then((timeseries) => {
        setState({
          loading: false,
          error: null,
          data: timeseries,
        });
      })
      .catch((error) => {
        console.error(error);
        setState({
          loading: false,
          error: error,
          data: null,
        });
      });
  }, [period]);

  return state;
}
