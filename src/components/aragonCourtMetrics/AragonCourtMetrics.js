import React from 'react';
import { JurorsChart } from '../jurorsChart/jurorsChart';
import { AnjActivatedChart } from '../anjActivatedChart/AnjActivatedChart';
import { useTheme } from '../../hooks/useTheme';

export function AragonCourtMetrics() {
  const theme = useTheme();

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
        <JurorsChart />
        <AnjActivatedChart />
      </div>
    </div>
  );
}
