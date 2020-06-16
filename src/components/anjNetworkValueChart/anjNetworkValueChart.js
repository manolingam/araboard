import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import numeral from 'numeral';
import { useTheme } from '../../hooks/useTheme';
import { ServicesContext } from '../../context/ServicesContext';
import { usePromise } from '../../hooks/usePromise';
import { chartLabel } from "../../hooks/blockNumbers.util";
import { usePeriod } from "../../hooks/usePeriod";

export function AnjNetworkValueChart() {
  const services = useContext(ServicesContext);
  const [period, setPeriod] = usePeriod();
  const theme = useTheme();
  const anjSupply = usePromise(services.anjSupply.timeseries(period), [period]);
  const anjPrice = usePromise(services.anjPrice.timeseries(period), [period]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  const loading = useMemo(() => {
    return anjSupply.loading || anjPrice.loading;
  }, [anjSupply.loading, anjPrice.loading]);

  const error = useMemo(() => {
    return anjSupply.error || anjPrice.error;
  }, [anjSupply.error, anjPrice.error]);

  const timeseries = useMemo(() => {
    if (!loading && !error && anjSupply.data && anjPrice.data) {
      return anjSupply.data.map((supplyPoint) => {
        const pricePoint = anjPrice.data.find((p) => p.timestamp.valueOf() === supplyPoint.timestamp.valueOf());
        const supplyAmount = new BigNumber(supplyPoint.value).div(10 ** 18);
        const usdPrice = pricePoint.value;
        const networkValue = usdPrice * supplyAmount;
        return {
          label: chartLabel(supplyPoint.timestamp),
          value: networkValue,
        };
      });
    }
  }, [loading, error, anjSupply.data, anjPrice.data]);

  const lastPointFormatted = useMemo(() => {
    if (timeseries) {
      const lastPoint = timeseries[timeseries.length - 1].value;
      return numeral(lastPoint).format('$0.0a');
    }
  }, [timeseries]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }} />
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }} />
        </div>
      </div>
    );
  } else if (error) {
    return <>X_X</>;
  } else {
    return (
      <GraphContainer
        title="Network Val."
        metric={lastPointFormatted}
        data={timeseries}
        period={period}
        onPeriodChange={handlePeriodChange}
        metricTitle={theme.thirdInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.thirdInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
