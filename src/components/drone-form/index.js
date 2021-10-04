import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../contexts/main-context';
import { modelContext } from '../../contexts/models-context';
import { createDrone, updateDrone } from '../../services/api-service/drones-service';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 120,
        marginBottom: '2rem',
        marginTop: '5rem'
    },
    paperStyle: {
        padding: 20,
        height: '50vh',
        width: 280,
        margin: '20px auto'
    },
    buttonStyle: {
        marginTop: '5rem',
        marginBottom: '2rem'
    },
    textField: {
        marginTop: '2rem'
    }
}));

export default function DroneForm({ mode }) {
    const [droneModel, setDroneModel] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [isDisabled, setDisabled] = useState(true);

    const { user } = useContext(MainContext);
    const { model } = useContext(modelContext);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if ( droneModel === null || droneModel === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [droneModel]);

    useEffect(() => {
        if (model && mode === 'editing') {
            setDroneModel(model.model);
            setManufacturer(model.manufacturer);
        } else {
            setDroneModel(null);
            setManufacturer(null);
        }
    }, [model]);

    function handleChange(event) {
        switch (event.target.name) {
            case 'model':
                setDroneModel(event.target.value);
                break;
            case 'manufacturer':
                setManufacturer(event.target.value);
                break;
        }
    }

    async function create() {
        return await createDrone(user.token, {model: droneModel, manufacturer});
    }

    async function update() {
        return await updateDrone(user.token, model.id, {model: droneModel, manufacturer});
    }

    async function handleSubmit() {
        const res = mode === 'creating' ? await create() : await update();

        if (res.ok) {
            history.push('/drones');
        }
    }

    return (
        <Typography>
            <Grid>
                <Paper className={classes.paperStyle} variant="outlined">
                    <Grid align='center'>
                        <h2>{mode === 'creating' ? 'Add drone' : 'Edit drone'}</h2>
                    </Grid>
                    <TextField name='model' label='Model'
                        placeholder='Enter model'
                        fullWidth value={droneModel} variant="outlined"
                        onChange={handleChange}
                        />
                    <TextField name='manufacturer' label='Manufacturer'
                        placeholder='Enter manufacturer'
                        fullWidth value={manufacturer} variant="outlined" multiline rows={4}
                        className={classes.textField}
                        onChange={handleChange} 
                        required/>
                    <Button className={classes.buttonStyle} type='submit' color='primary'
                        variant='contained' fullWidth disabled={isDisabled}
                        onClick={() => handleSubmit()}>
                        {mode === 'creating' ? 'create' : 'edit'}
                    </Button>
                    <Typography align='right' style={{ marginTop: '1.5rem' }}>
                        <Link style={{ textDecoration: 'none' }} to="/drones">
                            Cancel
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Typography>
    );
}