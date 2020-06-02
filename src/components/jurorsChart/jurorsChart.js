import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function JurorsChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);

  const theme = isLight ? lightTheme : darkTheme;

  return (
    <GraphContainer
      title="No. of Jurors"
      metric="275"
      metricTitle={theme.firstInSeries}
      metricNumber={theme.metricNumbers}
      pointColor={theme.firstInSeriesPoint}
      axesColor={theme.axesGridLines}
    />
  );
}
