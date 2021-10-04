import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../contexts/main-context';
import { modelContext } from '../../contexts/models-context';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getParts } from '../../services/api-service/parts-service';
import HttpError from './../../errors/HttpError';
import Error from '../error';
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner';
import { createContract, addSparePartForContractAsync } from '../../services/api-service/contracts-service';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
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

const ContractForm = () => {
    const [inputPart, setInputPart] = useState('');
    const [part, setPart] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [parts, setParts] = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(MainContext);
    const { model } = useContext(modelContext);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (user) {
            console.log('model');
            console.log(model);
            getParts(user.token).then((res) => {
                setParts(res);
                setIsLoading(false);
            }).catch((error) => {
                if (error instanceof HttpError) {
                    if (error.code === 401) {
                        history.push('/login');
                    } else {
                        setError(error);
                    }
                }
            })
        } else {
            setParts([]);
        }
    }, [user]);

    useEffect(() => {
        if (part === '' || quantity === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [part, quantity]);

    function handleChange(event) {
        switch (event.target.name) {
            case 'spare-part':
                console.log('/spare-part');
                console.log(event.target.value);
                console.log(typeof event.target.value);
                setPart(event.target.value);
                break;
            case 'quantity':
                console.log('quantity');
                console.log(event.target.value);
                console.log(typeof event.target.value);
                setQuantity(event.target.value);
                break;
            case 'spare-part-list':
                console.log('/spare-part-list');
                console.log(event.target.value);
                console.log(typeof event.target.value);
                setPart(event.target.value);
                break;
        }
    }

    async function addSparePartsForContract() {
        const response = await createContract(user.token,
            {workStartDate: '2021-07-20T00:00:00', workEndDate: '0001-01-01T00:00:00', serviceRequestId: model.id});
        const contract = await response.json();

        await addSparePartForContractAsync(user.token, contract.id, {sparePartId: part.id, quantity: quantity});
    }

    return (
        <>
            {isLoading ? <Spinner /> :
                error ? <Error message={error.message} code={error.code} /> : (
                    <Grid className={classes.root} container justifyContent='center' alignItems='center'>
                        <Paper className={classes.paperStyle} variant="outlined">
                            <Grid align='center'>
                                <h2>Add spare parts</h2>
                            </Grid>
                            <Autocomplete
                                value={part}
                                onChange={(event, newPart) => {
                                    setPart(newPart);
                                }}
                                inputValue={inputPart}
                                onInputChange={(event, newInputPart) => {
                                    setInputPart(newInputPart);
                                }}
                                options={parts}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) =>
                                    <TextField
                                        required {...params} label="Spare part" variant="outlined" />}
                            />
                            <TextField name='quantity' label='Quantity'
                                className={classes.textField}
                                type='number'
                                placeholder='Enter quantity'
                                required
                                onChange={handleChange}
                                min={0}
                                fullWidth variant="outlined" />
                            <Button className={classes.buttonStyle} type='submit' color='primary'
                                disabled={isDisabled}
                                onClick={addSparePartsForContract}
                                variant='contained' fullWidth>
                                Add
                            </Button>
                            <Typography align='right' style={{ marginTop: '6rem' }}>
                                <Link style={{ textDecoration: 'none' }} to="/requests">
                                    Cancel
                                </Link>
                            </Typography>
                        </Paper>
                    </Grid>
                )
            }
        </>
    );
}

export default ContractForm;