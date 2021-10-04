import React from 'react';
import { Route } from 'react-router-dom';
import LoggedComponent from '../logged-component';
import WithJwt from '../with-jwt';
import Header from '../header';
import AuthComponent from '../auth-component';
import MainPage from '../main-page';
import './app.css';
import RequestsPage from '../requests-page';
import RequestForm from '../request-form';
import { ModelContextProvider } from '../../contexts/models-context';
import CommentsPage from '../comments-page';
import DronesPage from '../drones-page';
import ContractForm from '../contract-form';
import ContractsPage from '../contracts-page';
import CommentForm from '../comment-form';
import DroneForm from '../drone-form';
import Error from './../error/index';

function App() {
    return (
        <>
            <Route exact path='/'>
                <Header />
                <MainPage />
            </Route>
            <Route path='/login'>
                <AuthComponent />
            </Route>
            <Route path='/register'>
                <AuthComponent isSignUp />
            </Route>
            <Route path='/home'>
                <WithJwt>
                    <Header />
                    <LoggedComponent />
                </WithJwt>
            </Route>
            <ModelContextProvider>
                <Route path='/requests'>
                    <WithJwt>
                        <Header />
                        <RequestsPage />
                    </WithJwt>
                </Route>
                <Route path='/request-creating'>
                    <WithJwt>
                        <RequestForm mode='creating' />
                    </WithJwt>
                </Route>
                <Route path='/request-editing'>
                    <WithJwt>
                        <RequestForm mode='editing' />
                    </WithJwt>
                </Route>
                <Route path='/comments'>
                    <WithJwt>
                        <Header />
                        <CommentsPage />
                    </WithJwt>
                </Route>
                <Route path='/comment-creating'>
                    <WithJwt>

                        <CommentForm mode='creating' />

                    </WithJwt>
                </Route>
                <Route path='/comment-editing'>
                    <WithJwt>
                        <CommentForm mode='editing' />
                    </WithJwt>
                </Route>
                <Route path='/drones'>
                    <WithJwt>
                        <Header />
                        <DronesPage />
                    </WithJwt>
                </Route>
                <Route path='/drone-creating'>
                    <WithJwt>
                        <DroneForm mode='creating' />
                    </WithJwt>
                </Route>
                <Route path='/drone-editing'>
                    <WithJwt>
                        <DroneForm mode='editing' />
                    </WithJwt>
                </Route>
                <Route path='/contract-form'>
                    <WithJwt>
                        <ContractForm />
                    </WithJwt>
                </Route>
                <Route path='/contracts'>
                    <WithJwt>
                        <Header />
                        <ContractsPage />
                    </WithJwt>
                </Route>
                <Route path='/error'>
                    <Header />
                    <Error />
                </Route>
            </ModelContextProvider>
        </>
    );
}

export default App;