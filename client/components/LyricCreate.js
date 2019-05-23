import React from 'react';
import { graphql } from 'react-apollo';

import addLyricToSong from '../mutations/addLyricToSong';

import Alert from '../services/Alert';

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lyric: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(this.state.lyric);
    this.props.mutate({
      variables: {
        content: this.state.lyric,
        songId: this.props.songId
      }
    }).then(result => {
      this.setState({ lyric: '' });
    }).catch(error => {
      Alert('error', error.message);
    });
  }

  render() {
    // console.log(this.props);
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          onChange={event => this.setState({ lyric: event.target.value })}
          value={this.state.lyric}
          required
        />
      </form>
    );
  }
}

export default graphql(addLyricToSong)(LyricCreate);
