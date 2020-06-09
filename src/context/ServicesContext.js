import React, { createContext } from 'react';
import { Services } from '../services/services';

export const ServicesContext = createContext(null);

export function ServicesProvider(props) {
  return <ServicesContext.Provider value={new Services()}>{props.children}</ServicesContext.Provider>;
}
