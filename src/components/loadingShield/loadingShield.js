import React, {useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import './loadingShield.css'

export function LoadingShield(props) {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const { loading, error } = props;

  const theme = isLight ? lightTheme : darkTheme;

  if (loading) {
    return (
    <div class="spinner">
      <div class="double-bounce1" style={{backgroundColor: theme.metricNumbers}}></div>
      <div class="double-bounce2" style={{backgroundColor: theme.metricNumbers}}></div>
    </div>
    )
  } else if (error) {
    return <>X_X</>;
  } else {
    const Component = props.component;
    return <Component {...props.props} />;
  }
}
