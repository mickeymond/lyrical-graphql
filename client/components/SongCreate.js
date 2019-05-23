import React from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import addSong from '../mutations/addSong';

import Alert from '../services/Alert';

class SongCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // console.log(this.props);
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: fetchSongs }]
    }).then(() => {
      hashHistory.push('/');
    }).catch(error => {
      Alert('error', error.message);
    });
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn">Back</Link>
        <h3>Create A New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            required
          />
        </form>
      </div>
    );
  }
}

export default graphql(addSong)(SongCreate);
