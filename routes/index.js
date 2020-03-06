const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", 
    {
      title: "Mongo Explorer"
    }
  );
  
});

/* GET home page. */
router.get("/:connection", function(req, res) {
  db.getDatabasesPromise(decodeURIComponent(req.params.connection))
    .then(db => res.render("index", 
      {
        title: "Mongo Explorer",
        databases: db.databases,
        actualURI: decodeURIComponent(req.params.connection)
      }
    ));
  
});

router.get("/:connection/:database/collections", function(req, res) {
  db.getCollectionPromise(decodeURIComponent(req.params.connection), req.params.database)
    .then(data => res.json(data));
});

router.get("/:connection/:database/collections/:collection", function(req, res) {
  db.getDocumentsPromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection)
    .then(data => res.json(data));
});

router.get("/:connection/:database/collections/:collection/:_id", function(req, res) {
  db.findOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection,  req.params._id)
    .then(data => 
    {
      if(data && data[0])
        res.json(data[0]);
      else
        res.json(data);
    });
});

router.post("/:connection/:database/collections/:collection/delete/:_id", function(req, res) {
  db.findAndDeleteOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.params._id)
    .then(res.redirect(req.get("referer")));
});

router.post("/:connection/:database/collections/:collection/update/:_id", function(req, res) {
  db.findAndUpdateOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.params._id, req.body)
    .then(res.redirect(req.get("referer")));
});

router.post("/:connection/:database/collections/:collection/create/", function(req, res) {
  db.createOneDocumentPromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.body)
    .then(res.redirect(req.get("referer")));
});

module.exports = router;
