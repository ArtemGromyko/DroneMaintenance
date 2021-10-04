import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { MainContext } from '../../contexts/main-context';
import { Grid } from '@material-ui/core';
import { deleteDrone, getDrones } from '../../services/api-service/drones-service'
import { useHistory } from 'react-router';
import { modelContext } from '../../contexts/models-context';
import HttpError from '../../errors/HttpError';
import Spinner from '../spinner';
import Error from './../error/index';

const useStyles = makeStyles({
    root: {
        width: '30%',
        margin: '0 auto',
        marginTop: '1rem',
        height: '100%'
    },
    card: {
        minWidth: 275,
        marginTop: '1rem'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    addButton: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
    }
});

const DronesPage = () => {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(MainContext);
    const { setModel } = useContext(modelContext);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getDrones(user.token).then((res) => {
                setRows(res)
                setIsLoading(false);
            }).catch((error) => {
                console.log('a');
                console.log(error);
                console.log(typeof error);
                if (error instanceof HttpError) {
                    console.log('b');
                    console.log(error.code);
                    if (error.code === 401) {
                        history.push('/login');
                    } else {
                        setError(error);
                    }
                }
            });
        } else {
            setRows([]);
        }

    }, [user]);

    async function handleDelete(id) {
        console.log('hello');
        debugger;
        const res = await deleteDrone(user.token, id);
        if (res.ok) {
            const arr = rows.filter((r) => r.id !== id);
            setRows(arr);
        }
    }

    function handleEdit(id) {
        setModel(rows.find((r) => r.id === id));
        history.push('/drone-editing');
    }

    return (
        <>
            {error ? <Error /> : (
                <Grid className={classes.root}>
                    <Grid direction='row' container alignItems='center' justifyContent='space-between'>
                        <Typography variant='h5'>Here you can see maintained drones.</Typography>
                        {user?.role === 'admin' ? (<Button className={classes.addButton} onClick={() => history.push('/drone-creating')}>Add</Button>) : null}
                    </Grid>
                    {isLoading ? <Spinner /> : (
                        <Grid className={classes.cards}>
                            {rows.map((row) => {
                                return (
                                    <Card key={row.id} className={classes.card} variant='outlined'>
                                        <CardContent>
                                            <Typography variant='h5' component='h2'>
                                                Model: {row.model}
                                            </Typography>
                                            <Typography variant='body2' component='p'>
                                                Manufacturer: {row.manufacturer}
                                            </Typography>
                                        </CardContent>
                                        {user?.role === 'admin' ? (
                                            <CardActions>
                                                <IconButton onClick={() => handleDelete(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleEdit(row.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </CardActions>
                                        ) : null}
                                    </Card>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            )}

        </>
    );
}

export default DronesPage;