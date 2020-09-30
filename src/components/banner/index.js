import React, { useState, useEffect } from 'react';
import './styles/banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch('http://localhost:3000/api/v1/movies/')
        .then((resp) => resp.json())
        .then((data) => {
          const random = Math.floor(Math.random() * data.length - 1);
          setMovie(data[random]);
        });
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${movie.background})`,
        backgroundPosition: 'center center',
      }}>
      <div className='banner_contents'>
        <h1 className='banner_title'>{movie.title}</h1>
        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>My List</button>
        </div>

        <h1 className='banner_description'>
          {truncate(movie.description, 150)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
