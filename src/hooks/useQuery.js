import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

export function useQuery(endpoint, query) {
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const graphQLClient = new GraphQLClient(endpoint);

  useEffect(() => {
    graphQLClient
      .request(query)
      .then((data) => {
        setState({
          loading: false,
          error: null,
          data: data,
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
  }, [endpoint, query]);

  return state;
}
