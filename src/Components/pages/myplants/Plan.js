import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function Plan() {
  const [value, setValue] = React.useState(new Date());

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
      label="등록일자"
      value={value}
      minDate={new Date('1900-01-01')}
      inputFormat={"yyyy-MM-dd"}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
    </LocalizationProvider>


  );
}
