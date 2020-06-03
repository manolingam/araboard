import { GraphContainer } from "../../template/graphContainer/GraphContainer";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function AnjNetworkValueChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;

  return <GraphContainer
    title="Network Val."
    metric="1.3m"
    metricTitle={theme.thirdInSeries}
    metricNumber={theme.metricNumbers}
    pointColor={theme.thirdInSeriesPoint}
    axesColor={theme.axesGridLines}
  />
}
