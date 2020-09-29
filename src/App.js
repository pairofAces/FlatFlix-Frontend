import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { Home, Browse, SignIn, SignUp } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import baseUrl from './helpers/routes';

export default function App() {
  const [user, setUser] = useState('');
  const history = useHistory();

  const submitHandler = (userObj) => {
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
      .then(
        (data) => setUser(data.user),
        () => history.push(ROUTES.BROWSE)
      );
  };

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}
          exact>
          <SignIn submitHandler={submitHandler} />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
          exact>
          <SignUp />
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
