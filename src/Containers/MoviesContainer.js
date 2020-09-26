import React, { Component } from 'react';
import routes from '../routes';

class MoviesContainer extends Component {
  state = {
    movies: [],
  };

  render() {
    return (
      <div>
        <h1>Netflix</h1>
      </div>
    );
  }

  componentDidMount() {
    fetch(routes.getMovies)
      .then((res) => res.json())
      .then((data) => {
        this.setState(() => ({ movies: data }));
      });
  }
}

export default MoviesContainer;
