import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MainContext } from '../../contexts/main-context';
import { useHistory } from 'react-router';
import { modelContext } from '../../contexts/models-context';
import { createRequest, updateRequest } from '../../services/api-service/requests-service';

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
        marginTop: '2rem',
        marginBottom: '2rem'
    }
}));

const serviceTypes = [
    {value: '', label: 'None'}, 
    {value: 0, label: 'Repair without replacement'},
    {value: 1, label: 'Repair with replacement'},
    {value: 2, label: 'Diagnostics'}
]

const RequestForm = ({ mode }) => {
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, changeDisabled] = useState(true);

    const { user } = useContext(MainContext);
    const { model } = useContext(modelContext);
    const  history = useHistory();

    useEffect(() => {
        if (serviceType === '') {
            changeDisabled(true);
        } else {
            changeDisabled(false);
        }
    }, [serviceType]);

    useEffect(() => {
        if (mode === 'editing') {
            setServiceType(serviceTypes.find( (st) => st.label === model.serviceType).value);
            setDescription(model.description);
        }
    }, [model]);

    const classes = useStyles();

    async function handleSubmit(event) {
        event.preventDefault();

        let res = mode == 'creating' ? await handleCreate() : await handleUpdate();
        if(res.ok) {
            history.push('/requests');
        }
    }

    function handleChange(event) {
        switch (event.target.name) {
            case 'description':
                setDescription(event.target.value);
                break;
            case 'serviceType':
                setServiceType(event.target.value);
                break;
        }
    }

    async function handleCreate() {
        const createdmodel = {
            serviceType,
            description
        };

        return await createRequest(user, createdmodel);
    }

    async function handleUpdate() {
        const updatedmodel = {
            serviceType,
            description
        };
        
        return await updateRequest(user, model.id, updatedmodel);
    }

    return (
        <Typography>
            <Grid>
                <Paper className={classes.paperStyle} variant="outlined">
                    <Grid align='center'>
                        <h2>{mode === 'creating' ? 'model creating' : 'model editing'}</h2>
                    </Grid>
                    <FormControl variant="outlined" className={classes.root} fullWidth>
                        <InputLabel id="serviceType" required>Service Type</InputLabel>
                        <Select
                            labelId="serviceType"
                            value={serviceType}
                            onChange={handleChange}
                            name="serviceType"
                            label="Service Type"
                        >
                            {
                                serviceTypes.map((st) => {
                                    return (
                                        <MenuItem value={st.value}>{st.label}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField name='description' label='Description'
                        placeholder='Enter description'
                        fullWidth value={description} onChange={handleChange} variant="outlined" multiline rows={4} />
                    <Button className={classes.buttonStyle} type='submit' color='primary'
                        variant='contained' fullWidth onClick={handleSubmit} disabled={isDisabled}>
                        {mode === 'creating' ? 'Create' : 'Update'}
                    </Button>

                    <Typography align='right' style={{ marginTop: '1.5rem' }}>
                        <Link style={{ textDecoration: 'none' }} to="/requests">
                            Cancel
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </Typography>
    );
}

export default RequestForm;