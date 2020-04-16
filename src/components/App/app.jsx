import React, { Component } from 'react';
// import Datos from '../Datos/datos';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../../Routes'

class App extends Component {

    render(){
        return (
            <Router>
                <div>
                    <Routes />
                </div>
            </Router>
        );    
    }
}

export default App;