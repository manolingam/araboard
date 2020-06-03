import React, { useContext } from 'react';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { ThemeContext } from '../../context/ThemeContext';
import numeral from 'numeral';

export function AnjActivatedChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  const jurors = props.jurors;

  if (jurors.loading) {
    return (
      <div className='spinner-container'>
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }}/>
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }}/>
        </div>
      </div>
    )
  } else if (jurors.error) {
    console.error(jurors.error);
    return <>X_X</>;
  } else {
    const timeseries = jurors.data.map((point) => {
      return {
        value: Math.round(point.activeBalance),
        label: point.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
      };
    });
    const lastPoint = timeseries[timeseries.length - 1].value;
    const lastActivated = numeral(lastPoint).format('0.0a');
    return (
      <GraphContainer
        title="ANJ Activated"
        metric={lastActivated}
        data={timeseries}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
  //
  // return (
  //   <GraphContainer
  //     title="ANJ Activated"
  //     metric="80.3m"
  //     metricTitle={theme.secondInSeries}
  //     metricNumber={theme.metricNumbers}
  //     pointColor={theme.secondInSeriesPoint}
  //     axesColor={theme.axesGridLines}
  //   />
  // );
}
