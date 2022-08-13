import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Snackbar, IconButton } from '@mui/material';

// components
import Iconify from './Iconify';

// context imports
import { SnackBarContext } from '../sections/context/Contexts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function SnackBar() {
  const snackBarContext = useContext(SnackBarContext);

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackBarContext.snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackBarContext.snackPack[0] });
      snackBarContext.setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackBarContext.snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackBarContext, messageInfo, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
        }
      />
    </div>
  );
}
