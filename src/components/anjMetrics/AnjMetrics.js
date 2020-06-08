import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AragonCourtMetrics } from '../aragonCourtMetrics/AragonCourtMetrics';
import { AnjSupplyChart } from '../anjSupplyChart/AnjSupplyChart';
import UIGraphicTwo from '../../assets/araboard-UI-graphic2.png';

import './AnjMetrics.css';
import { useLastBlockNumber } from '../../hooks/useLastBlockNumber';
import { AnjPriceChart } from '../anjPriceChart/AnjPriceChart';
import { useAnjSupply } from '../../hooks/useAnjSupply';
import { AnjNetworkValueChart } from '../anjNetworkValueChart/anjNetworkValueChart';
import { useAnjPrice } from '../../hooks/useAnjPrice';
import { Period } from '../../template/graphContainer/Period';
import { useAntPrice } from '../../hooks/useAntPrice';
import { ServicesContext } from "../../context/ServicesContext";

export function AnjMetrics() {
  const services = useContext(ServicesContext)
  const lastBlockNumber = useLastBlockNumber();
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const anjSupply = useAnjSupply();
  const antPrice = useAntPrice(Period.M1);
  const anjPrice = useAnjPrice(Period.M1, anjSupply, antPrice); // FIXME

  return (
    <div className="component-container">
      <div className="metric-title-container">
        <h2 style={{ color: theme.metricTitle }}>ANJ Metrics</h2>
        <img src={UIGraphicTwo} height="110px" width="auto" alt="" />
      </div>
      <AragonCourtMetrics />
      <div className="component-sub-container anj" style={{ borderColor: theme.borderColor }}>
        <div
          className="box-title"
          style={{
            backgroundColor: theme.metricBoxHeaderBg,
            borderColor: theme.borderColor,
          }}
        >
          <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON NETWORK JUROR TOKEN</h3>
          <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
        </div>
        <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
          <AnjPriceChart anjPrice={anjPrice} />
          <AnjSupplyChart anjSupply={anjSupply} lastBlockNumber={lastBlockNumber} />
          <AnjNetworkValueChart anjSupply={anjSupply} anjPrice={anjPrice} />
        </div>
      </div>
    </div>
  );
}
