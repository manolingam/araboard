import React from 'react';
import numeral from 'numeral';

export function PriceFormat(props) {
  return <>{numeral(props.number).format(props.format)}</>;
}
