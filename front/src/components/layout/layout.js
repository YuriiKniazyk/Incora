import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  './layout.css'

export default class Layout extends Component {
    state={ loggedIn: !!localStorage.getItem('userName') };

    logout = () =>{
        localStorage.clear();
        this.setState({loggedIn: false});
    }

    render() {
                   
        return (
            <div id="main">
                <header>
                    <div className='home'>
                        <Link to="/" >Feed list</Link>
                    </div>
                    <div className='sine'>
                        {this.state.loggedIn ?
                            <Link to="/login" onClick={this.logout}>Logout</Link>
                            :<Link to="/login" onClick={()=> {this.setState({ loggedIn: true })}} >Login</Link>}    
                    </div>   
                </header>
            </div>
        )
    }
}
