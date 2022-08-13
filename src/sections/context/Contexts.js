import { createContext } from 'react';

// snackbar context
export const SnackBarContext = createContext({
  snackType: undefined,
  setSnackType: () => {},
  snackPack: undefined,
  setSnackPack: () => {},
  openSnackBar: () => {}
});
