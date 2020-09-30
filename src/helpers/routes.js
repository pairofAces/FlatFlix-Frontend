import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const routes = {
  getMovies: 'http://localhost:3000/api/v1/movies/',
  Popular: 'http://localhost:3000/api/v1/movies/genres/popular',
  Comedy: 'http://localhost:3000/api/v1/movies/genres/comedy',
  Drama: 'http://localhost:3000/api/v1/movies/genres/drama',
  Crime: 'http://localhost:3000/api/v1/movies/genres/crime',
  Thriller: 'http://localhost:3000/api/v1/movies/genres/thriller',
  Action: 'http://localhost:3000/api/v1/movies/genres/action',
  Animation: 'http://localhost:3000/api/v1/movies/genres/animation',
  Fantasy: 'http://localhost:3000/api/v1/movies/genres/fantasy',
  Adventure: 'http://localhost:3000/api/v1/movies/genres/adventure',
  Romance: 'http://localhost:3000/api/v1/movies/genres/romance',
  signUp: 'http://localhost:3000/api/v1/users/',
  signIn: 'http://localhost:3000/api/v1/login/',
  profile: 'http://localhost:3000/api/v1/profile',
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
