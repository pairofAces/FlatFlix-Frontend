import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Home, Browse, SignIn, SignUp } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import baseUrl from './helpers/routes';
import history from './history';

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(baseUrl.profile, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((data) =>
          this.setState(() => ({
            user: data.user,
          }))
        );
    } else {
      history.push(ROUTES.HOME);
    }
  }

  signUpHandler = (userObj) => {
    fetch(baseUrl.signUp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: userObj.name,
          email: userObj.email,
          password: userObj.password,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        this.setState(
          () => ({
            user: data.user,
          }),
          () => history.push(ROUTES.BROWSE)
        );
      });
  };

  signInHandler = (userObj) => {
    fetch(baseUrl.signIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: userObj.email,
          password: userObj.password,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        this.setState(
          () => ({
            user: data.user,
          }),
          () => history.push(ROUTES.BROWSE)
        );
      });
  };

  render() {
    const { user } = this.state;

    return (
      <Router history={history}>
        <Switch>
          <IsUserRedirect
            user={user}
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.SIGN_IN}
            exact>
            <SignIn signInHandler={this.signInHandler} />
          </IsUserRedirect>
          <IsUserRedirect
            user={user}
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.SIGN_UP}
            exact>
            <SignUp signUpHandler={this.signUpHandler} />
          </IsUserRedirect>
          <ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
            <Browse />
          </ProtectedRoute>
          <IsUserRedirect
            user={user}
            loggedInPath={ROUTES.BROWSE}
            path={ROUTES.HOME}
            exact>
            <Home />
          </IsUserRedirect>
        </Switch>
      </Router>
    );
  }
}

export default App;
