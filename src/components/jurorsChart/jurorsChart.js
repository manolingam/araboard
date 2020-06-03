import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import numeral from "numeral";

export function JurorsChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const jurors = props.jurors

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
    console.error(jurors.error)
    return <>X_X</>
  } else {
    const timeseries = jurors.data.map(point => {
      return {
        value: point.jurorsCount,
        label: point.timestamp.toLocaleString({ month: 'long', day: '2-digit' })
      }
    })
    const lastPoint = timeseries[timeseries.length - 1].value
    const lastJurors = numeral(lastPoint).format('0')
    return (
      <GraphContainer
        title="No. of Jurors"
        metric={lastJurors}
        data={timeseries}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
