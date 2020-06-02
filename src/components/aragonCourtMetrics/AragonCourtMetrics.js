import React, { useContext } from 'react';
import { JurorsChart } from '../jurorsChart/jurorsChart';
import { AnjActivatedChart } from '../anjActivatedChart/AnjActivatedChart';
import { ThemeContext } from '../../context/ThemeContext';
import { useJurors } from '../../hooks/useJurors';

export function AragonCourtMetrics() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const jurors = useJurors();

  return (
    <div className="component-sub-container anj" style={{ borderColor: theme.borderColor }}>
      <div
        className="box-title"
        style={{
          backgroundColor: theme.metricBoxHeaderBg,
          borderColor: theme.borderColor,
        }}
      >
        <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON COURT</h3>
        <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
      </div>

      <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
        <JurorsChart jurors={jurors} />
        <AnjActivatedChart jurors={jurors} />
      </div>
    </div>
  );
}
