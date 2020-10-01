import React, { useState, useEffect } from 'react';
import './styles/row.css';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
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
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => (
          <div key={movie.id} className='content'>
            <div className='favorite'>{addIcon}</div>
            <img
              onClick={() => handleClick(movie)}
              // onMouseEnter={() => setIsShown(true)}
              // onMouseLeave={() => setIsShown(false)}
              className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
              src={isLargeRow ? movie.poster : movie.background}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
