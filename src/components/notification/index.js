import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Grid, Card } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    modalBackground: {
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.86)'
      },
      modalCard: {
        margin: '0 auto',
        display: 'block',
        marginTop: '250px',
        width: '300px',
        height: '300px',
        backgroundColor: 'lightgray',
        borderRadius: '5px'
      }
}));

const Notification = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.modal}>
            <Card className={classes.paper}>
                <h2>Contract created successfully</h2>
      <p>
        You can find it on the contracts page.
      </p>
            </Card>
        </Grid>
    );
}

export default Notification;