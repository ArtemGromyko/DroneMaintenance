import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../contexts/main-context';
import { modelContext } from '../../contexts/models-context';
import { createCommentForUser, updateCommentForUser } from '../../services/api-service/comments-service';
import { useHistory } from 'react-router';

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

export default function CommentForm({ mode }) {
    const [header, setHeader] = useState(null);
    const [text, setText] = useState(null);
    const [isDisabled, setDisabled] = useState(true);

    const { user } = useContext(MainContext);
    const { model } = useContext(modelContext);
    
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (text === null || text === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [text]);

    useEffect(() => {
        if (model && mode === 'editing') {
            setHeader(model.header);
            setText(model.text);
        } else {
            setHeader(null);
            setText(null);
        }
    }, [model]);

    function handleChange(event) {
        switch (event.target.name) {
            case 'header':
                setHeader(event.target.value);
                break;
            case 'text':
                setText(event.target.value);
                break;
        }
    }

    async function create() {
        return await createCommentForUser(user, { header, text });
    }

    async function update() {
        return await updateCommentForUser(user, model.id, { header, text });
    }

    async function handleSubmit() {
        const res = mode === 'creating' ? await create() : await update();

        if (res.ok) {
            history.push('/comments');
        }
    }

    return (

        <Grid className={classes.root} container justifyContent='center' alignItems='center'>
                <Paper className={classes.paperStyle} variant="outlined">
                    <Grid align='center'>
                        <h2>{mode === 'creating' ? 'Write a comment' : 'Comment editing'}</h2>
                    </Grid>
                    <TextField name='header' label='Header'
                        placeholder='Enter header'
                        fullWidth value={header} variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField name='text' label='Text'
                        placeholder='Enter your comment'
                        fullWidth value={text} variant="outlined" multiline rows={4}
                        className={classes.textField}
                        onChange={handleChange}
                        required />
                    <Button className={classes.buttonStyle} type='submit' color='primary'
                        variant='contained' fullWidth disabled={isDisabled}
                        onClick={() => handleSubmit()}>
                        {mode === 'creating' ? 'send' : 'edit'}
                    </Button>
                    <Typography align='right' style={{ marginTop: '1.5rem' }}>
                        <Link style={{ textDecoration: 'none' }} to="/comments">
                            Cancel
                        </Link>
                    </Typography>
                </Paper>
        </Grid>

    );
}