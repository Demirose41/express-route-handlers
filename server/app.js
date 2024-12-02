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

app.patch("/artists/:artistId", (req, res) => {
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

// Edit a specified album by albumId
app.put("/albums/:albumId", (req, res) => {
  const editedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  res.status(200).setHeader("Content-Type", "application/json").json(editedAlbum)
})

app.patch("/albums/:albumId", (req, res) => {
  const editedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  res.status(200).setHeader("Content-Type", "application/json").json(editedAlbum)
})

// 12. Delete a specified album by albumId
app.delete("/albums/:albumId", (req, res) => {
  deleteAlbumByAlbumId(req.params.albumId)
  res.status(200).setHeader("Content-Type", "application/json").json({"message": "Successfully deleted"})
})

// 13. Get all albums with names filtered by first letter
app.get("/albums/", (req, res) => {
  if(req.query){
    const filteredAlbums = getFilteredAlbums(req.query.startsWith)
    res.status(200).setHeader("Content-Type", "application/json").json(filteredAlbums)
  }
})

// 14. Get a specific song's details based on songId
app.get("/songs/:songId", (req, res) => {
  const songDetails = getSongBySongId(req.params.songId)
  res.status(200).setHeader("Content-Type", "application/json").json(songDetails)
})

// 15. Add a song to a specific album based on albumId
app.post("/albums/:albumId/songs", (req, res) => {
  const addedSong = addSongByAlbumId(req.params.albumId, req.body)
  res.status(201).setHeader("Content-Type", "application/json").json(addedSong)
})

// 16. Get all songs of a specific artist baed on artistId
app.get("/artists/:artistId/songs", (req, res) => {
  const artistsSongs = getSongsByArtistId(req.params.artistId);
  res.status(200).setHeader("Content-Type","application/json").json(artistsSongs)
})

// 17. Get all songs of a specific album based on albumId

app.get("/albums/:albumId/songs", (req, res) => {
  res.status(200).setHeader("Content-Type", "application/json").json(getSongsByAlbumId(req.params.albumId))
})

// 18. Edit a specified song by songId
app.put("/songs/:songId", (req, res) => {
  res.status(200).setHeader("Content-Type", "application/json").json(editSongBySongId(req.params.songId, req.body))
})

app.patch("/songs/:songId", (req, res) => {
  res.status(200).setHeader("Content-Type", "application/json").json(editSongBySongId(req.params.songId, req.body))
})

// 19. Delete a specified song by songId

app.delete("/songs/:songId", (req, res) => {
  deleteSongBySongId(req.params.songId)
  res.status(200).setHeader("Content-Tyoe", "application/json").json({"message": "Successfully deleted"})
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}