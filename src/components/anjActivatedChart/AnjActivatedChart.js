import React, { useContext } from "react";
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { ThemeContext } from "../../context/ThemeContext";

export function AnjActivatedChart(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  const jurors = props.jurors

  return (
    <GraphContainer
      title="ANJ Activated"
      metric="80.3m"
      metricTitle={theme.secondInSeries}
      metricNumber={theme.metricNumbers}
      pointColor={theme.secondInSeriesPoint}
      axesColor={theme.axesGridLines}
    />
  );
}
