import React, { useState, useEffect } from 'react';
import './styles/row.css';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl)
        .then((resp) => resp.json())
        .then((data) => setMovies(data));
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            src={isLargeRow ? movie.poster : movie.background}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
