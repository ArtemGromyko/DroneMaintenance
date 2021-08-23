import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { MainContext } from '../../contexts/main-context';
import { signOut } from '../../services/api-service';

const useStyles = makeStyles({
    root: {
        width: '80%',
        minHeight: '75px',
        margin: '0 auto'
    },
    link: {
        color: '#000000',
        textDecoration: 'none',
        "&:hover": {
            color: "#2196F3"
        }
    },
    buttonIn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    },
    buttonOut: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    }
});

const Header = () => {
    const { setJwt, user, jwt } = useContext(MainContext);
    const history = useHistory();
    const classes = useStyles();

    const onSignOut = () => {
        signOut(user.id, jwt).then((response) => {
            if (response.ok) {
                setJwt();
                history.push('/');
            }
        });
    }

    return (
        <Card variant='outlined'>
            <Typography>
                <Grid className={classes.root} direction='row' container alignItems='center' justifyContent="space-between">
                    <h1>
                        <Link className={classes.link} to="/">
                            Drone Maintenance
                        </Link>
                    </h1>

                    {!user ? (null) : (
                        <>
                            <h4>
                                <Link className={classes.link} to="/requests">
                                    Requests
                                </Link>
                            </h4>
                            <h4>
                                <Link className={classes.link} to="/comments">
                                    Comments
                                </Link>
                            </h4>
                        </>
                    )}

                    {!user ? (
                        <Button className={classes.buttonIn} onClick={() => history.push('/login')}>Sign in</Button>
                    ) : (
                        <Button className={classes.buttonOut} onClick={onSignOut}>Sign out</Button>
                    )}
                </Grid>
            </Typography>
        </Card>
    );
};

export default Header;