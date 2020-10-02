import React, { useState, useEffect, useCallback } from 'react';
import './styles/favorite.css';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const addIcon = <FontAwesomeIcon icon={faPlus} />;

class Favorite extends React.Component {
  state = {
    movies: [],
    favorites: [],
    trailerUrl: '',
    buttonId: '',
    favId: '',
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await fetch(`http://localhost:3000/api/v1/favorites`)
  //       .then((resp) => resp.json())
  //       .then((data) => setMovies(data));
  //     return request;
  //   }
  //   fetchData();
  // }, [user.id]);

  static opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  handleClick = (movie) => {
    if (this.state.trailerUrl) {
      this.setState(() => ({
        trailerUrl: '',
      }));
    } else {
      this.setState(() => ({
        trailerUrl: movie.trailer,
        buttonId: movie.id,
        FavId: movie.id,
      }));
    }
  };

  addToFavorite = (e) => {
    let currentList = [...this.state.movies];
    const movieId = e.target.id;
    const favId = e.target.favId;
    console.log(e.target.innerText);

    if (e.target.innerText === '+ My List') {
      console.log('Added to MyList: ', this.props.user.id, movieId);
      // debugger;
      fetch(this.props.favoriteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user_id: this.props.user.id,
          movie_id: movieId,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState(() => ({
            movies: [currentList, data],
          }));
        });
      e.target.innerText = 'My List';
    } else {
      fetch();
    }
  };

  render() {
    console.log(this.state.movies);

    return (
      <div className='row'>
        <h2>{this.props.title}</h2>

        <div className='row_posters'>
          {this.state.movies.map((movie) => (
            <div key={movie.id} className='content'>
              <img
                onClick={() => this.handleClick(movie)}
                id={movie.id}
                className={`row_poster ${
                  this.props.isLargeRow && 'row_posterLarge'
                }`}
                src={this.props.isLargeRow ? movie.poster : movie.background}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
        {this.state.trailerUrl && (
          <div className='trailer-container'>
            <button
              id={this.state.buttonId}
              favorite={this.state.favId}
              onClick={(e) => this.addToFavorite(e)}
              className='favorite'>
              + My List
            </button>
            <YouTube videoId={this.trailerUrl} opts={this.opts} />
          </div>
        )}
      </div>
    );
  }
}

export default Favorite;
