import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { MenuItem, Select } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFSelect({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select {...field} fullWidth error={!!error} helperText={error?.message} {...other}>
          {options.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
