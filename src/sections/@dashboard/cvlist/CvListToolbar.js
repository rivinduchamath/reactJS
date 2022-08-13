import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  },
  marginLeft: 'auto'
}));

// ----------------------------------------------------------------------

CvListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  rowCount: PropTypes.number,
  onFilterName: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function CvListToolbar({
  numSelected,
  filterName,
  rowCount,
  onFilterName,
  onSelectAllClick
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          }
          label={`${numSelected} selected`}
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          }
          label="Select all"
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Download">
          <IconButton>
            <Iconify color="primary.main" icon="ic:baseline-file-download" />
          </IconButton>
        </Tooltip>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}
    </RootStyle>
  );
}
