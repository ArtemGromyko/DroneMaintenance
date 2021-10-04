import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { authenticate } from '../../services/api-service/users-service';
import { Avatar, Grid, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MainContext } from '../../contexts/main-context';
import HttpError from './../../errors/HttpError';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AuthComponent = ({ isSignUp }) => {
    const [name, changeName] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [error, setError] = useState(false);

    const [isDisabled, changeDisabled] = useState(true);
    const { setUser } = useContext(MainContext);
    const history = useHistory();

    function toggleDisabled() {
        if (email !== '' && password !== '' && (isSignUp ? name !== '' : true)) {
            changeDisabled(false);
        } else {
            changeDisabled(true);
        }
    }

    function handleChange(event) {
        setError(false);
        switch (event.target.name) {
            case 'name':
                changeName(event.target.value);
                toggleDisabled();
                break;
            case 'email':
                changeEmail(event.target.value);
                toggleDisabled();
                break;
            case 'password':
                changePassword(event.target.value);
                toggleDisabled();
                break;
            default:
                break;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            let res;
            if (isSignUp) {
                res = await authenticate({ email, name, password }, false);
               
            } else {
                res = await authenticate({ email, password }, true);
            }
            setUser(res);
            history.push('/');
        } catch(error) {
            if(error instanceof HttpError) {
                setError(error);
            }
        }
    }

    const paperStyle = { padding: 20, height: '50vh', width: 280, margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#40E0D0' };
    const buttonStyle = { marginTop: 40, marginBottom: 40 };

    return (
        <Grid container justifyContent='center' alignItems='center' style={{height: '100%'}}>
            <Paper variant='outlined' style={paperStyle}>
                <Grid align='center'>
                    {isSignUp ? (
                        <>
                            <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                            <h2>Sign up</h2>
                        </>
                    ) : (
                        <>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>Sign in</h2>
                        </>
                    )}
                </Grid>
                {isSignUp ? (
                    <TextField name='name' label='Name' value={name} onChange={handleChange} placeholder='Enter name' fullWidth required />
                ) : null}

                <TextField name='email' label='Email' value={email} onChange={handleChange} placeholder='Enter email' fullWidth required 
                error={error} helperText={error ? 'Incorrect email' : ''}/>
                <TextField name='password' label='Password'
                    placeholder='Enter password'
                    type='password' fullWidth required value={password} onChange={handleChange}
                    error={error} helperText={error ? 'Incorrect password' : ''} />
                <Button style={buttonStyle} type='submit' color='primary'
                    variant='contained' fullWidth onClick={handleSubmit} disabled={isDisabled}>{isSignUp ? 'Sign up' : 'Sign in'}
                </Button>
                {isSignUp ? null : (
                    <Typography component='span' variant='body2'>
                        <Link style={{ textDecoration: 'none' }} to="/register">
                            Create an account
                        </Link>
                    </Typography>
                )}
                <Typography align='right' style={{ marginTop: 100 }}>
                    <Link style={{ textDecoration: 'none' }} to="/">
                        Cancel
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default AuthComponent;