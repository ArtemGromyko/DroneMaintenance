import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@material-ui/core';

export default function Spinner() {
    return (
        <Grid container className='loader' style={{width: '100%'}} justifyContent='center' alignItems='center'>
            <CircularProgress size={100} />
        </Grid>
    );
}