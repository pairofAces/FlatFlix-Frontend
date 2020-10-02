import React, { useState, useEffect, useCallback } from 'react';
import './styles/row.css';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Row({ title, fetchUrl, isLargeRow, user, favoriteUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [buttonId, setButtonId] = useState('');
  const [isShown, setIsShown] = useState(false);
  const addIcon = <FontAwesomeIcon icon={faPlus} />;

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

  const addToFavorite = (e) => {
    const movieId = e.target.id;
    console.log(movieId);
    console.log(user.id);
    fetch(favoriteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id,
        movie_id: e.target.id,
      }),
    })
      .then((resp) => resp.json())
      .then(console.log);
  };

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            data-img={movie.id}
            className='content'
            // onMouseEnter={handleHover}
            // onMouseLeave={handleHover}
          >
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
            onClick={(e) => addToFavorite(e)}
            className='favorite'>
            {addIcon} My List
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
