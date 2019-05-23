const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

// SongSchema.plugin(uniqueValidator);

mongoose.model('song', SongSchema);
