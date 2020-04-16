import React, { Component } from 'react';
import './navBar.css'

class NavBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark nav_body">
                    <div className="collapse navbar-collapse col-md-12 text-center" id="navbarSupportedContent">
                        <h4 className="text-center">Biblioteca de Babel</h4>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;