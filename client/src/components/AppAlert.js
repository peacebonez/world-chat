import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const AppAlert = ({ trigger }) => {
  return (
    <Snackbar
      open={Boolean(trigger)}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" variant="filled">
        {trigger ? trigger : ''}
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
