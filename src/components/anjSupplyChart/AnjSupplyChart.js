import React, { useContext } from 'react';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import numeral from 'numeral';
import BigNumber from 'bignumber.js';
import { useTheme } from '../../hooks/useTheme';
import { ServicesContext } from '../../context/ServicesContext';
import { usePromise } from '../../hooks/usePromise';
import { chartLabel } from "../../hooks/blockNumbers.util";
import { usePeriod } from "../../hooks/usePeriod";

export function AnjSupplyChart() {
  const services = useContext(ServicesContext);
  const theme = useTheme();
  const [period, setPeriod] = usePeriod();
  const anjSupply = usePromise(services.anjSupply.timeseries(period), [period]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  if (anjSupply.loading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }} />
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }} />
        </div>
      </div>
    );
  } else if (anjSupply.error) {
    return <>X_X</>;
  } else {
    const timeseries = anjSupply.data.map((point) => {
      return {
        value: Math.round(new BigNumber(point.value).dividedBy(10 ** 18).toNumber()),
        label: chartLabel(point.timestamp)
      };
    });
    const lastPoint = timeseries[timeseries.length - 1].value;
    const lastPointFormatted = numeral(lastPoint).format('0.0a');
    return (
      <GraphContainer
        title="Supply"
        metric={lastPointFormatted}
        data={timeseries}
        period={period}
        onPeriodChange={handlePeriodChange}
        metricTitle={theme.secondInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.secondInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
