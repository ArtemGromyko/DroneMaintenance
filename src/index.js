import { Typography } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import { MainContextProvider } from "./contexts/main-context";

ReactDOM.render(
    <React.StrictMode>
            <MainContextProvider>
                <Router>
                    <App />
                </Router>
            </MainContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);