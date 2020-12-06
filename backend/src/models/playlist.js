const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      song: String,
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
