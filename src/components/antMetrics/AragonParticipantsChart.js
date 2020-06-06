import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { useAntParticipants } from '../../hooks/useAntParticipants';
import numeral from 'numeral';

export function AragonParticipantsChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const { loading, error, data } = useAntParticipants();

  if (loading) {
    return (
      <div className='spinner-container'>
        <div className="spinner">
          <div className="double-bounce1" style={{ backgroundColor: theme.metricNumbers }}/>
          <div className="double-bounce2" style={{ backgroundColor: theme.metricNumbers }}/>
        </div>
      </div>
    )
  } else if (error) {
    return <>X_X</>;
  } else {
    const graphData = data.map((data) => {
      return {
        value: data.value,
        label: data.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
      };
    });
    const lastPoint = graphData[graphData.length - 1].value
    const lastParticipants = numeral(lastPoint).format('0.0a')
    return (
      <GraphContainer
        title="Participants"
        metric={lastParticipants}
        data={graphData}
        metricTitle={theme.firstInSeries}
        metricNumber={theme.metricNumbers}
        pointColor={theme.firstInSeriesPoint}
        axesColor={theme.axesGridLines}
      />
    );
  }
}
