import React from 'react';

// export default function Browse() {
//   return <p>Hello from the browse page!</p>;
// }

export default class Browse extends React.Component {
  state = {
    currentUser: this.user
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/movies")
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  render() {
    return <p>Hello from the browse page!</p>;
  }
}