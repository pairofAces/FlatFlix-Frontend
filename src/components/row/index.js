import React, { useState, useEffect } from 'react';
import './styles/row.css';
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow, addFavorite }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [buttonId, setButtonId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl)
        .then((resp) => resp.json())
        .then((data) => setMovies(data));
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      setTrailerUrl(movie.trailer);
      setButtonId(movie.id);
    }
  };

  const favoriteHandler = (e) => {
    const movieId = e.target.id;
    addFavorite(movieId);
    setTrailerUrl('');
  };

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => (
          <div key={movie.id} data-img={movie.id} className='content'>
            <img
              onClick={() => handleClick(movie)}
              id={movie.id}
              className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
              src={isLargeRow ? movie.poster : movie.background}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
      {trailerUrl && (
        <div className='trailer-container'>
          <button
            id={buttonId}
            onClick={(e) => favoriteHandler(e)}
            className='favorite'>
            + My List
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
