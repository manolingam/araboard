import React from 'react';
import numeral from 'numeral';

export function StakingFormat(props) {
  const { staked, supply } = props;

  const usd = numeral(staked).format('$0.0a');
  const percentageValue = (staked / supply) * 100;
  const percentageFormatted = numeral(percentageValue).format('0');

  return (
    <>
      {percentageFormatted}% ({usd})
    </>
  );
}
