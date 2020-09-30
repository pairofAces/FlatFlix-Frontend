import React from 'react';
import Row from '../components/row/Row';
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
        <Row title='Comedy' fetchUrl={request.Comedy} />
        <Row title='Drama' fetchUrl={request.Drama} />
      </>
    );
  }
}
