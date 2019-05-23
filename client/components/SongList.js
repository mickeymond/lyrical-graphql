import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../mutations/deleteSong';

// import BounceLoader from 'react-spinners/BounceLoader';

class SongList extends React.Component {

  deleteSong(id) {
    this.props.mutate({
      variables: { id: id },
    }).then(() => this.props.data.refetch());
  }

  render() {
    // console.log(this.props);
    if (this.props.data.loading) {
        return <p>Loading Songs...</p>;
    }

    return (
      <div>
        <h3>All Songs</h3>
        <ul className="collection">
          {this._renderSongs(this.props.data.songs)}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }

  _renderSongs(songs) {
    // console.log(songs);
    return songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons right"
            onClick={() => this.deleteSong(id)}
          >delete</i>
        </li>
      );
    });
  }
} 

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
