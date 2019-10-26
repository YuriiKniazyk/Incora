import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AddFeed from '../addFeed/addFeed';

const defaultFeeds = [
    {
        id: 1,
        username: "admin",
        title: "NASA Breaking news",
        url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",

    },
    {
        id: 2,
        username: "admin",
        title: "Reddit front page",
        url: "https://www.reddit.com/.rss",
    },
    {
        id: 3,
        username: "admin",
        title: "Mobile World Live",
        url: "https://www.mobileworldlive.com/latest-stories/feed/",
    }
]
export default class Home extends Component {
    state = {
        feeds: [],
        username: '',
        title: '',
        url: ''
    }

    deleteFeed = (id, username) => {
        fetch(`http://localhost:3300/feed/delete`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({ id, username })
        })
            .then(response => response.json())
            .then(data => {
                if (data.succses) {
                    this.setState((state) => ({
                        feeds: state.feeds.filter((feed) => feed.id !== id)
                    }));
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        fetch(`http://localhost:3300/feed/list?username=${localStorage.getItem('userName')}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.allFeed.length) {
                    this.setState({ feeds: data.allFeed })
                } else {
                    this.setState({ feeds: defaultFeeds });

                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    addFeed = (feed) => {
        const updateFeed = [...this.state.feeds, feed];
        this.setState({ feeds: updateFeed });
    }

    onFeedClick = (id, username) => {
        fetch(`http://localhost:3300/feed/fetchfeed?id=${id}&username=${localStorage.getItem('userName')}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ rss: data.rss })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        console.log(this.state.rss)
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                    {this.state.feeds.map(({ id, username, title, url }) =>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => this.onFeedClick(id, username)} key={id}> {title} {url}
                            <button onClick={() => this.deleteFeed(id, username)}>Delete</button>
                        </div>
                    )}
                </div>
                <br />
                <AddFeed onAddFeed={this.addFeed} />

                {this.state.rss &&
                    <Redirect
                        to={{
                            pathname: "/rss",
                            state: { rss: this.state.rss }
                        }}
                    />
                }
            </div>
        )
    }

}