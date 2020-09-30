import React from 'react';
import '../browse.css';
import Row from '../components/row';
import Banner from '../components/banner';
import request from '../helpers/routes';

// export default function Browse() {
//   return <p>Hello from the browse page!</p>;
// }

export default class Browse extends React.Component {
  state = {
    currentUser: this.user,
  };

  // componentDidMount() {
  //   console.log('Mounting');
  //   fetch('http://localhost:3000/api/v1/movies')
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data));
  //   console.log('Mounted');
  // }

  render() {
    return (
      <>
        <Banner />
        <Row title='Popular' fetchUrl={request.Popular} isLargeRow />
        <Row title='Comedy' fetchUrl={request.Comedy} />
        <Row title='Drama' fetchUrl={request.Drama} />
        <Row title='Crime' fetchUrl={request.Crime} />
        <Row title='Thriller' fetchUrl={request.Thriller} />
        <Row title='Action' fetchUrl={request.Action} />
        <Row title='Animation' fetchUrl={request.Animation} />
        <Row title='Fantasy' fetchUrl={request.Fantasy} />
        <Row title='Adventure' fetchUrl={request.Adventure} />
        <Row title='Romance' fetchUrl={request.Romance} />
      </>
    );
  }
}
