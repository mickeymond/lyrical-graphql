const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { title }) {
        return Song.create({ title }).then(song => song);
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        songId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { content, songId }) {
        return Lyric.create({ content, songId }).then(lyric => Song.findById(songId).then(song => song));
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Lyric.findById(id).then(lyric => {
          ++lyric.likes;
          return lyric.save();
        });
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.deleteOne({_id: id}).then(song => song);
      }
    }
  }
});

module.exports = mutation;
