import React, { Component } from 'react';

export default class AddFeed extends Component {
    state = {
        username: localStorage.getItem('userName'),
        title: '',
        url: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    addFeed = () => {
        fetch(`http://localhost:3300/feed/create`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username: this.state.username, title: this.state.title, url: this.state.url })
        })
        .then(response => response.json())
        .then(data => {
            if(data.succses){
                this.setState({ title: '', url: '' });
                this.props.onAddFeed(data.feed);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    render() {
        
        return (
            <div>
                <h1>Add Feed</h1>
                    <label>Title:
                <input type="text" name="title" onChange={this.handleChange} value = {this.state.title} />
                    </label>
                    <label>URL:
                <input type="text" name="url" onChange={this.handleChange} value = {this.state.url}/>
                    </label>
                    <button onClick={this.addFeed} >Add Feed</button>
            </div>
        )
    }

}