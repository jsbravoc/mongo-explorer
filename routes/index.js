/**
 * Router module.
 * @module index/router
 */

/**
 * @constant express 
 * @type {NodeModule}
 * Loads express module used as a http server.
 */
const express = require("express");
/**
 * @constant router 
 * @type {NodeModule}
 * Loads router module.
 */
const router = express.Router();
/**
 * @constant db 
 * @type {NodeModule}
 * Loads MongoUtils module to access the database.
 */
const db = require("../db/MongoUtils");

/**
 * @method GET "/"
 * Returns server-side rendered index.hbs to the client, passing as a parameter an object with title.
 */
router.get("/", function (req, res) {
  res.render("index", {
    title: "Mongo Explorer"
  });
});

/**
 * @method GET "/:connection"
 * Returns server-side rendered index.hbs to the client, passing as a parameter an object with title 
 * and a list of databases queried with the URL parameter :connection (MongoDB URI parameter).
 */
router.get("/:connection", function (req, res) {
  db.getDatabasesPromise(decodeURIComponent(req.params.connection))
    .then(db => res.render("index", {
      title: "Mongo Explorer",
      databases: db.databases,
      actualURI: decodeURIComponent(req.params.connection)
    }));

});

/**
 * @method GET "/:connection/:database/collections"
 * Returns data endpoint to the client, querying all collections of a given database and a MongoDB URI connection string.
 */
router.get("/:connection/:database/collections", function (req, res) {
  db.getCollectionPromise(decodeURIComponent(req.params.connection), req.params.database)
    .then(data => res.json(data));
});

/**
 * @method GET "/:connection/:database/collections/:collection"
 * Returns data endpoint to the client, querying a specific collection of a given database and a MongoDB URI connection string.
 */
router.get("/:connection/:database/collections/:collection", function (req, res) {
  db.getDocumentsPromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection)
    .then(data => res.json(data));
});

/**
 * @method GET "/:connection/:database/collections/:collection/:_id"
 * Returns data endpoint to the client, querying a specific document of a specific collection of a given database 
 * and a MongoDB URI connection string.
 */
router.get("/:connection/:database/collections/:collection/:_id", function (req, res) {
  db.findOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.params._id)
    .then(data => {
      if (data && data[0])
        res.json(data[0]);
      else
        res.json(data);
    });
});

/**
 * @method POST "/:connection/:database/collections/:collection/delete/:_id"
 * Deletes a specific document of a specific collection of a given database and a MongoDB URI connection string.
 * Then, it redirects to the page that sent the request.
 */
router.post("/:connection/:database/collections/:collection/delete/:_id", function (req, res) {
  db.findAndDeleteOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.params._id)
    .then(res.redirect(req.get("referer")));
});

/**
 * @method POST "/:connection/:database/collections/:collection/update/:_id"
 * Updates a specific document of a specific collection of a given database and a MongoDB URI connection string, by
 * receiving the new object as req.body of the form that called the method.
 * Then, it redirects to the page that sent the request.
 */
router.post("/:connection/:database/collections/:collection/update/:_id", function (req, res) {
  db.findAndUpdateOnePromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.params._id, req.body)
    .then(res.redirect(req.get("referer")));
});

/**
 * @method POST "/:connection/:database/collections/:collection/create"
 * Creates a document in a specific collection of a given database and a MongoDB URI connection string, by
 * receiving the new object as req.body of the form that called the method.
 * Then, it redirects to the page that sent the request.
 */
router.post("/:connection/:database/collections/:collection/create/", function (req, res) {
  db.createOneDocumentPromise(decodeURIComponent(req.params.connection), req.params.database, req.params.collection, req.body)
    .then(res.redirect(req.get("referer")));
});

module.exports = router;