import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useJurors } from "../../hooks/useJurors";
import numeral from "numeral";

export function JurorsChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const jurors = useJurors()

  if (jurors.loading) {
    return <>...</>
  } else if (jurors.error) {
    console.error(jurors.error)
    return <>X_X</>
  } else {
    const timeseries = jurors.data.map(point => {
      return {
        value: point.value,
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
