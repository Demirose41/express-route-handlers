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

app.get("/artists/:artistId", (req, res) =>{
  const artist = getArtistByArtistId(req.params.artistId)
  if(artist.artistId){
    res.status(200);
    res.setHeader("Content-Type", "application/json")
    res.json(artist)
  }else{
    res.status(404).send("artist not found")
  }
})

app.put("/artists/:artistId", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.json(editArtistByArtistId(req.params.artistId, req.body))
})

app.delete("/artists/:artistId", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  deleteArtistByArtistId(req.params.artistId);
  res.json({"message": "Successfully deleted"})
})

app.post('/artists', (req, res) => {
  const newArtist = addArtist(req.body)
  res.status(201)
  res.setHeader("Content-Type", "application/json")
  res.send(newArtist)

})

// Albums
// Get a specific album's details based on albumId
app.get("/artists/:artistId/albums", (req, res) => {
  res.status(200).setHeader("Content-Type", "application/json").json(getAlbumsByArtistId(req.params.artistId))
})

// Get a specific album's details based on albumId
app.get("/albums/:albumId", (req, res) => {
  res.status(200).setHeader("Content-Type", "application/json").json(getAlbumByAlbumId(req.params.albumId))
})

// Add an album to a specific artist based on artistId
app.post("/artists/:artistId/albums", (req, res) => {
  const newAlbum = addAlbumByArtistId(req.params.artistId, req.body)
  res.status(201).setHeader("Content-Type", "application/json").json(newAlbum)
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}