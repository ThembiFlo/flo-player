app.delete('/api/v1/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
// 
  db.map((song, index) => {
    if (song.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Song deleted successfully',
       })
  }
})
})
 