import { useContext, useState, useCallback, useEffect } from "react";
import { EthereumProviderContext } from "../context/EthereumProviderContext";

export function useLastBlockNumber() {
  const web3 = useContext(EthereumProviderContext);
  const [lastBlockNumber, setLastBlockNumber] = useState(null);

  const fetchLastBlockNumber = useCallback(() => {
    if (!lastBlockNumber) {
      web3.eth
        .getBlockNumber()
        .then((num) => {
          setLastBlockNumber(num - 100); // To adjust for lagging Graph indexer
        })
        .catch((error) => {
          console.error(error)
        });
    }
  }, [lastBlockNumber, web3.eth]);

  useEffect(() => {
    fetchLastBlockNumber();
  });

  return lastBlockNumber
}
