import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import numeral from 'numeral';
import { ServicesContext } from '../../context/ServicesContext';
import { usePromise } from '../../hooks/usePromise';
import { chartLabel } from '../../hooks/blockNumbers.util';
import { usePeriod } from "../../hooks/usePeriod";

export function JurorsChart() {
  const services = useContext(ServicesContext);
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const [period, setPeriod] = usePeriod();
  const jurors = usePromise(services.jurors.timeseries(period), [period]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  if (jurors.loading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }} />
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }} />
        </div>
      </div>
    );
  } else if (jurors.error) {
    console.error(jurors.error);
    return <>X_X</>;
  } else {
    const timeseries = jurors.data.map((point) => {
      return {
        value: point.jurorsCount,
        label: chartLabel(point.timestamp),
      };
    });
    const lastPoint = timeseries[timeseries.length - 1].value;
    const lastJurors = numeral(lastPoint).format('0');
    return (
      <GraphContainer
        title="No. of Jurors"
        metric={lastJurors}
        data={timeseries}
        period={period}
        onPeriodChange={handlePeriodChange}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
