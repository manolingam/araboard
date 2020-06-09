import { useContext, useState, useEffect } from 'react';
import { ServicesContext } from '../context/ServicesContext';

export function useLastBlockNumber() {
  const services = useContext(ServicesContext);
  const [lastBlockNumber, setLastBlockNumber] = useState(null);

  useEffect(() => {
    if (!lastBlockNumber) {
      services.ethereum
        .getLastBlockNumber()
        .then((block) => {
          setLastBlockNumber(block);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return lastBlockNumber;
}
