import React, { Component } from 'react';

export default  class LoginUser extends Component {
    
    state = {
        username: '',
        password: '',
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
       
        
        fetch('http://localhost:3300/feed/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('userName', username);
            this.props.history.push("/");
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                    <label>UserName:
                <input type="text" name="username" onChange={this.handleChange} value = {this.state.username} />
                    </label>
                    <label>Password:
                <input type="password" name="password" onChange={this.handleChange} value = {this.state.password}/>
                    </label>
                    <button onClick={this.handleSubmit} >login</button>
            </div >
        )
    }

}
