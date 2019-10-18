import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
// Set up the express app
const app = express();


//serving static files
app.use(express.static('public'));
app.use(cors());
// get all playlist

const PORT = 3090;

// Logic space

const fakeDatabase = {
  0: {
    id: 1,
  title: 'Alicia Keys',
  description: 'Piano man'
  },
  1: {
    id: 2,
  title: 'Brandy',
  description: 'Have you ever'
  }
}

// app.get('/api/v1/playlist', (req, res) => {
//   console.log('Getting things done');
// });

function onRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./public/index.html', null, function(error, data){
    if (error){ 
      response.writeHead(404);
      response.write('There\'s an error somewhere');
    } else {
      // let playlist = [1,2,3];
      response.write(data);
      // response.write(JSON.stringify(playlist));
      // response.write(JSON.stringify(db));
      //  getPlaylist();
    }
    response.end();
  });

}
http.createServer(onRequest).listen(8000);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get endpoint

  app.get('/api/v1/playlist', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'playlist retrieved successfully',
      playlist: db,
      
    })
  });

 // post end point
app.post('/api/v1/playlist', (req, res) => {
  if(!req.body.artist) {
    return res.status(400).send({
      success: 'false',
      message: 'artist is required'
    });
  } else if(!req.body.song) {
    return res.status(400).send({
      success: 'false',
      message: 'song is required'
    });
  }
 const song = {
   id: db.length + 1,
   artist: req.body.artist,
   song: req.body.song,
   time: req.body.time
 }
 db.push(song);
 return res.status(201).send({
   success: 'true',
   message: 'song added successfully',
   song
 })
});

// get single request

app.get('/api/v1/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((playlist) => {
    if (playlist.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'song retrieved successfully',
        playlist,
      });
    } 
});
 return res.status(404).send({
   success: 'false',
   message: 'song does not exist',
  });
});


// delete single song
app.delete('/api/v1/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((song, index) => {
    if (song.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Song deleted successfully',
       });
    }
  });


    return res.status(404).send({
      success: 'false',
      message: 'song not found',
    });

 
});

// update song

app.put('/api/v1/playlist/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let songFound;
  let itemIndex;
  db.map((playlist, index) => {
    if (playlist.id === id) {
      songFound = playlist;
      itemIndex = index;
    }
  });

  if (!songFound) {
    return res.status(404).send({
      success: 'false',
      message: 'song not found',
    });
  }

  if (!req.body.artist) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.song) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  const updatedSong = {
    id: songFound.id,
    artist: req.body.artist || songFound.artist,
    song: req.body.song || songFound.song,
    time: req.body.time || songFound.time
  };

  db.splice(itemIndex, 1, updatedSong);

  return res.status(201).send({
    success: 'true',
    message: 'song updated successfully',
    updatedSong,
  });
});
