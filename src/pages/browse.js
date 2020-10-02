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
    fetch(`${request.signUp}${this.props.user.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(() => ({
          favorites: data.favorites,
        }));
      });
  }

  removeFavorite = (favId) => {
    fetch(`${request.addFavorite}${favId}`, {
      method: 'DELETE',
    });
    let currentList = [...this.state.favorites];
    let foundObj = currentList.find((e) => e.id === favId);
    let foundInd = currentList.indexOf(foundObj);
    currentList.splice(foundInd, 1);
    this.setState(() => ({
      favorites: currentList,
    }));
  };

  addFavorite = (movieId) => {
    const currentList = [...this.state.favorites];
    fetch(request.addFavorite, {
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
          favorites: [...currentList, data],
        }));
      });
  };

  render() {
    console.log(this.state.favorites);
    return (
      <>
        <Navbar />
        <Banner moviesUrl={request.getMovies} />
        <Favorite
          removeFavorite={this.removeFavorite}
          user={this.props.user}
          title='My List'
          favorites={this.state.favorites}
          isLargeRow
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Comedy'
          fetchUrl={request.Comedy}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Drama'
          fetchUrl={request.Drama}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Popular'
          fetchUrl={request.Popular}
          isLargeRow
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Crime'
          fetchUrl={request.Crime}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Thriller'
          fetchUrl={request.Thriller}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Action'
          fetchUrl={request.Action}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Animation'
          fetchUrl={request.Animation}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Fantasy'
          fetchUrl={request.Fantasy}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Adventure'
          fetchUrl={request.Adventure}
        />
        <Row
          user={this.props.user}
          addFavorite={this.addFavorite}
          title='Romance'
          fetchUrl={request.Romance}
        />
      </>
    );
  }
}
