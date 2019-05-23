import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../queries/fetchSong';

import LyricList from './LyricList';
import LyricCreate from './LyricCreate';

class SongDetail extends React.Component {
  render() {
    const { song, loading } = this.props.data;
    if (loading) {
      return <p>Loading Song...</p>;
    }

    return (
      <div>
        <Link to="/" className="btn">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
