import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const AppAlert = ({ condition }) => {
  return (
    <Snackbar
      open={Boolean(condition)}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" variant="filled">
        {condition ? condition : ''}
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
