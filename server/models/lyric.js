const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  songId: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String, unique: true }
});

// LyricSchema.plugin(uniqueValidator);

mongoose.model('lyric', LyricSchema);
