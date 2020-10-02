import React from 'react';
import Navbar from '../components/navbar';
import '../browse.css';
import Row from '../components/row';
import Favorite from '../components/favorite';
import Banner from '../components/banner';
import request from '../helpers/routes';

// export default function Browse() {
//   return <p>Hello from the browse page!</p>;
// }

export default class Browse extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/user/${this.props.user.id}/favorites`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(() => ({
          favorites: data.favorites,
          movies: data.movies,
        }));
      });
  }

  render() {
    return (
      <>
        <Navbar />
        <Banner moviesUrl={request.getMovies} />
        <Favorite
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='My List'
          favorites={this.state.favorites}
          isLargeRow
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Comedy'
          fetchUrl={request.Comedy}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Drama'
          fetchUrl={request.Drama}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Popular'
          fetchUrl={request.Popular}
          isLargeRow
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Crime'
          fetchUrl={request.Crime}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Thriller'
          fetchUrl={request.Thriller}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Action'
          fetchUrl={request.Action}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Animation'
          fetchUrl={request.Animation}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Fantasy'
          fetchUrl={request.Fantasy}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Adventure'
          fetchUrl={request.Adventure}
        />
        <Row
          user={this.props.user}
          favoriteUrl={request.addFavorite}
          title='Romance'
          fetchUrl={request.Romance}
        />
      </>
    );
  }
}
