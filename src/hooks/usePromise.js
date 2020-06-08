import { useEffect, useState } from 'react';

export function usePromise(promise, deps = []) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    setState({
      loading: true,
      error: null,
      data: null,
    });
    promise
      .then((result) => {
        setState({
          loading: false,
          error: null,
          data: result,
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
  }, deps);

  return state;
}
