var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Albums() {
  return knex('albums')
}

/* GET home page. */
router.get('/albums', function(req, res, next) {
  res.render('albums/index');
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.post('/albums', function(req, res, next) {
  Albums().insert({
    artist: req.body.artist,
    name: req.body.album_name,
    genre: req.body.genre,
    stars: parseInt(req.body.stars),
    explicit: Boolean(req.body.explicit)
  }).then(function() {
    res.redirect('/albums');
  })
});

module.exports = router;
