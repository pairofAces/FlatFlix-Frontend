import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const routes = {
  getMovies: 'http://localhost:3000/api/v1/movies/',
  signUp: 'http://localhost:3000/api/v1/users/',
  signIn: 'http://localhost:3000/api/v1/login/',
};

export function IsUserRedirect({ user, loggedInPath, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: 'signin',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export default routes;
