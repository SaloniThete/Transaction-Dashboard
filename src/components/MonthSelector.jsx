import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const MonthSelector = ({ month, setMonth }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return (
    <FormControl fullWidth>
      <InputLabel>Month</InputLabel>
      <Select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m, index) => (
          <MenuItem key={index} value={m}>{m}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;