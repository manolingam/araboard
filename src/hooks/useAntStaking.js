import { useContext, useEffect, useState } from 'react';
import { NETWORK_RESERVE_ADDR } from './contracts.util';
import { ServicesContext } from '../context/ServicesContext';

export function useAntStaking() {
  const services = useContext(ServicesContext);
  const [state, setState] = useState({ loading: true, error: null, value: null });

  useEffect(() => {
    services.antToken
      .balanceOfNumber(NETWORK_RESERVE_ADDR)
      .then((balance) => {
        setState({
          loading: false,
          error: null,
          value: balance,
        });
      })
      .catch((error) => {
        setState({
          loading: false,
          error: error,
          value: null,
        });
      });
  }, [services]);

  return state;
}
