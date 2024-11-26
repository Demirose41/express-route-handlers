// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();
app.use(express.json())
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// Your code here
app.get("/artists/latest/albums", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json")
  res.send(getAlbumsForLatestArtist())
})

app.get("/artists/latest" , (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json")
  res.send(getLatestArtist())
})

app.get("/artists", (req, res) =>{
  res.status(200);
  res.setHeader("Content-Type", "application/json")
  res.send(getAllArtists())
  return
})

app.post('/artists', (req, res) => {
  const newArtist = addArtist(req.body)
  res.status(201)
  res.setHeader("Content-Type", "application/json")
  res.send(newArtist)

})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}