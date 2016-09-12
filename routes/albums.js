var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Albums() {
  return knex('albums')
}

/* GET home page. */
router.get('/albums', function(req, res, next) {
  Albums().select().then(function(results) {
    res.render('albums/index', {albums: results});
  })
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.get('/albums/:id', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function (results) {
    res.render('albums/show', {albums: results});
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  Albums().where({id: req.params.id}).first().then(function (results) {
    res.render('albums/edit', {albums: results});
  });
});

router.post('/albums/:id/edit', function(req, res, next) {
  Albums().where({id: req.params.id}).update({
    artist: req.body.artist,
    name: req.body.album_name,
    genre: req.body.genre,
    stars: parseInt(req.body.stars),
    explicit: Boolean(req.body.explicit)
  }).then(function() {
    res.redirect(`/albums/${req.params.id}`);
  })
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

//DELETE
router.post('/albums/:id/delete', function(req, res, next) {
  Albums().where({id: req.params.id}).del()
  .then(function() {
    res.redirect('/albums')
  })
});

module.exports = router;
