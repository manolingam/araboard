import { Period } from '../template/graphContainer/Period';
import { useState } from 'react';

const DEFAULT_PERIOD = Period.M6;

export function usePeriod(defaultPeriod = DEFAULT_PERIOD) {
  return useState(defaultPeriod);
}
