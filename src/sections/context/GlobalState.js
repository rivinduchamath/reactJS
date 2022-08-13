import PropTypes from 'prop-types';
import { useState, useReducer, createRef, useEffect, useMemo } from 'react';
// context imports
import { SnackBarContext } from './Contexts';

GlobalState.propTypes = {
  children: PropTypes.node
};

function GlobalState(props) {
  // snackbar context
  const [snackType, setSnackType] = useState('');
  const [snackPack, setSnackPack] = useState([]);
  const openSnackBar = (message, type) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    setSnackType(type);
  };
  const snack = useMemo(
    () => ({
      snackType,
      snackPack,
      setSnackPack,
      openSnackBar
    }),
    [snackPack, snackType]
  );

  return <SnackBarContext.Provider value={snack}>{props.children}</SnackBarContext.Provider>;
}

export default GlobalState;
