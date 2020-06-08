import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Period } from './Period';

export function PeriodSelector(props) {
  const { pointColor, defaultPeriod, onChange } = props;

  const THEME = createMuiTheme({
    typography: {
      fontFamily: "'Overpass', sans-serif;",
      body1: {
        fontSize: '10pt',
      },
    },
  });

  const StyledFormControlLabel = withStyles(() => ({
    root: {
      color: pointColor,
    },
  }))(FormControlLabel);

  const StyledRadio = withStyles(() => ({
    root: {
      color: pointColor,
    },
  }))(Radio);

  const [value, setValue] = React.useState(defaultPeriod);

  const handleChange = (event) => {
    const selected = event.target.value;
    setValue(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <ThemeProvider theme={THEME}>
      <FormControl component="fieldset">
        <RadioGroup row aria-label="timeframe" name="timeframe" value={value} onChange={handleChange}>
          <StyledFormControlLabel value={Period.M1} control={<StyledRadio size="small" />} label="1 MONTH" />
          <StyledFormControlLabel value={Period.M3} control={<StyledRadio size="small" />} label="3 MONTHS" />
          <StyledFormControlLabel value={Period.M6} control={<StyledRadio size="small" />} label="6 MONTHS" />
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
}
