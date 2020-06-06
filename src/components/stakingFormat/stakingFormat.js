import React from 'react';
import numeral from 'numeral';

export function StakingFormat(props) {
  const { staked, metrics } = props;

  const supply = metrics.supply;
  const usdPerAnt = metrics.price;
  const usd = numeral(staked * usdPerAnt).format('$0.0a');
  const percentageValue = (staked / supply) * 100;
  const percentageFormatted = numeral(percentageValue).format('0');

  return (
    <span title={`${numeral(staked).format('0,0')} ANT`}>
      {percentageFormatted}% ({usd})
    </span>
  );
}
