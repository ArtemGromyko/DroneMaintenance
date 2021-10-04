import React from 'react';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';

export default function Error({ message, code }) {
    return (
        <Grid container className='error' style={{width: '100%'}} justifyContent='center' alignItems='center'>
            <Card style={{width: '30%', height: '20%'}} variant='outlined'>
                <CardContent>
                    <Typography style={{textAlign: 'center'}} variant='h5' component='h2'>
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}