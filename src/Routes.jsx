import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,Redirect
} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import client from './client';
import Dashboard from "./components/Dashboard/dashboard";
import NavBar from './components/NavBar/navBar';

class Routes extends Component {
    render() { 
        return ( 
            <Router>
                <main>
                    <ApolloProvider client={client}>
                        <NavBar />
                        <Route exact path = "/" component={Dashboard} />
                    </ApolloProvider>
                </main>
            </Router>
        );
    }

}

export default Routes;