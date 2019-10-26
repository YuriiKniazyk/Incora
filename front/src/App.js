import React, {Component} from 'react';
import { Container } from '@material-ui/core';

import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './components/home/home';
import LoginUser from './components/login/login';
import Rss from './components/rss';

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
      <Container>
          <Layout />
          <Route exact path='/' component={Home} />
          <Route path='/login' component={LoginUser} />
          <Route path='/rss' component={Rss} />
          </Container>
      </BrowserRouter>

    )
  }
}

export default App;