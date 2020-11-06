import React, { Component } from 'react';
import './styles/favorite.css';
import YouTube from 'react-youtube';

class Favorite extends Component {
  state = {
    favorites: [],
    trailerUrl: '',
    buttonId: '',
    favId: '',
    opts: {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    },
  };

  handleClick = (fav) => {
    if (this.state.trailerUrl) {
      this.setState(() => ({
        trailerUrl: '',
      }));
    } else {
      this.setState(() => ({
        trailerUrl: fav.movie.trailer,
        buttonId: fav.movie.id,
        favId: fav.id,
      }));
    }
  };

  favoriteHandler = () => {
    this.props.removeFavorite(this.state.favId);
    this.setState(() => ({
      trailerUrl: '',
    }));
  };

  render() {
    return (
      <div className='row'>
        <h2>{this.props.title}</h2>

        <div className='row_posters'>
          {this.props.favorites.map((fav) => (
            <div key={fav.id} className='content'>
              <img
                onClick={() => this.handleClick(fav)}
                id={fav.movie.id}
                className={`row_poster ${
                  this.props.isLargeRow && 'row_posterLarge'
                }`}
                src={
                  this.props.isLargeRow
                    ? fav.movie.poster
                    : fav.movie.background
                }
                alt={fav.movie.title}
              />
            </div>
          ))}
        </div>
        {this.state.trailerUrl && (
          <div className='trailer-container'>
            <button
              id={this.state.buttonId}
              favor={this.state.favId}
              onClick={() => this.favoriteHandler()}
              className='favorite'>
              Remove from My List
            </button>
            <YouTube videoId={this.state.trailerUrl} opts={this.state.opts} />
          </div>
        )}
      </div>
    );
  }
}

export default Favorite;
