import React, { useState, useEffect } from 'react';
import './styles/row.css';
import YouTube from 'react-youtube';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      setTrailerUrl(movie.trailer)
    }
  }
  // movieTrailer(movie?.name || "")
  //   .then((url) => {
  //     const urlParams = new URLSearchParams(new URL(url).search);
  //     setTrailerUrl(urlParams.get("v"));
  //   })
  //   .catch((error) => console.log(error));

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            src={isLargeRow ? movie.poster : movie.background}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
