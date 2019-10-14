let ArtistModel = require("../models/artist.model");
let express = require("express");
let router = express.Router();

//create a new artist
//POST localhost:3090/playlist
router.post("artist", (req, res) => {
  if (!req.body) {
    return req.status(400).send("Request body is missing");
  }

  let model = new ArtistModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })

    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
