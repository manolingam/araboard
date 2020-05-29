import React from 'react';

export function LoadingShield(props) {
  const { loading, error } = props;

  if (loading) {
    return <>...</>;
  } else if (error) {
    return <>X_X</>;
  } else {
    const Component = props.component;
    return <Component {...props.props} />;
  }
}
