import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import UIGraphicOne from '../../assets/araboard-UI-graphic.png';
import './AntMetrics.css';
import { useAntMetrics } from '../../hooks/useAntMetrics';
import { LoadingShield } from '../loadingShield/loadingShield';
import { PriceFormat } from '../priceFormat/priceFormat';
import { useAntStaking } from '../../hooks/useAntStaking';
import { StakingFormat } from '../stakingFormat/stakingFormat';
import { AragonDaoChart } from "./AragonDaoChart";

export function AntMetrics() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const antMetrics = useAntMetrics();
  const antStaking = useAntStaking();

  const theme = isLight ? lightTheme : darkTheme;
  return (
    <div className="component-container">
      <div className="metric-title-container">
        <h2 style={{ color: theme.metricTitle }}>ANT Metrics</h2>
        <img src={UIGraphicOne} height="110px" width="auto" alt="" />
      </div>

      <div className="component-sub-container" style={{ borderColor: theme.borderColor }}>
        <div
          className="box-title"
          style={{
            backgroundColor: theme.metricBoxHeaderBg,
            borderColor: theme.borderColor,
          }}
        >
          <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON NETWORK TOKEN</h3>
          <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
        </div>

        <div className="stats" style={{ backgroundColor: theme.metricBoxBg }}>
          <div className="individual-stats">
            <h5 style={{ color: theme.antMetricStatsTitle }}>Price</h5>
            <h4 style={{ color: theme.metricNumbers }}>
              <LoadingShield
                loading={antMetrics.loading}
                error={antMetrics.error}
                component={PriceFormat}
                props={{ number: antMetrics.metrics?.price, format: '$0,0.00' }}
              />
            </h4>
          </div>
          <div className="individual-stats">
            <h5 style={{ color: theme.antMetricStatsTitle }}>Supply</h5>
            <h4 style={{ color: theme.metricNumbers }}>
              <LoadingShield
                loading={antMetrics.loading}
                error={antMetrics.error}
                component={PriceFormat}
                props={{ number: antMetrics.metrics?.supply, format: '0.0a' }}
              />
            </h4>
          </div>
          <div className="individual-stats">
            <h5 style={{ color: theme.antMetricStatsTitle }}>Mkt Cap</h5>
            <h4 style={{ color: theme.metricNumbers }}>
              <LoadingShield
                loading={antMetrics.loading}
                error={antMetrics.error}
                component={PriceFormat}
                props={{ number: antMetrics.metrics?.marketCap, format: '$0.0a' }}
              />
            </h4>
          </div>
          <div className="individual-stats">
            <h5 style={{ color: theme.antMetricStatsTitle }}>Staked</h5>
            <h4 style={{ color: theme.metricNumbers }}>
              <LoadingShield
                loading={antMetrics.loading || antStaking.loading}
                error={antStaking.error || antMetrics.error}
                component={StakingFormat}
                props={{ staked: antStaking.value, metrics: antMetrics.metrics }}
              />
            </h4>
          </div>
        </div>
      </div>
      <AragonDaoChart/>
    </div>
  );
}
