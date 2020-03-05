const express = require('express');
const router = express.Router();
const db = require("../db/MongoUtils");

/* GET home page. */
router.get('/', function(req, res) {
  db.getDatabasesPromise()
  .then(db => res.render('index', { title: 'Mongo Explorer', db}));
  
});

router.get('/:database/collections', function(req, res) {
  db.getCollectionPromise(req.params.database)
  .then(cols => res.json(cols))
});

module.exports = router;
