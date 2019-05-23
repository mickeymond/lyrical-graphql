import React from 'react';
import { graphql } from 'react-apollo';

import likeLyric from '../mutations/likeLyric';

import Alert from '../services/Alert';

class LyricList extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <ul className="collection">
        {this._renderLyrics(this.props.lyrics)}
      </ul>
    );
  }

  _renderLyrics(lyrics) {
    // console.log(songs);
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <i
            className="material-icons right"
            onClick={() => this.likeLyric(id)}
          >thumb_up</i>
          <span className="new badge" data-badge-caption="likes">
            <strong>{likes}</strong>
          </span>
        </li>
      );
    });
  }

  likeLyric(id) {
    this.props.mutate({
      variables: { id }
    }).then(result => {
      Alert('success', 'Liked lyrics successfully');
    }).catch(error => {
      Alert('error', error.message);
    });;
  }
}

export default graphql(likeLyric)(LyricList);
