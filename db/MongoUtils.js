/**
 * MongoDB driver module.
 * @module MongoUtils
 */


/**
 * @constant MongoClient 
 * @type {NodeModule}
 * @default
 * Loads MongoClient module used to access the MongoDB database.
 */
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

/**
 * @function getDatabasesPromise
 * @alias module:MongoUtils.getDatabasesPromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @throws {Error} if uri param is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return an object with the databases.
 */
exports.getDatabasesPromise = (uri) => {
  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(client =>
      client
        .db()
        .admin()
        .listDatabases()
    ).catch(err => new Error(err));
};

/**
 * @function getCollectionPromise
 * @alias module:MongoUtils.getCollectionPromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query its collections.
 * @throws {Error} If uri parameter is null, undefined or is not a string.
 * @throws {Error} If dbName parameter is null, undefined or is not a string.
 * @throws {Error} If the connection could be established.
 * @returns {Promise} Promise which will return an array of the databases collections.
 */
exports.getCollectionPromise = (uri, dbName) => {
  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(
      client =>
        client
          .db(dbName)
          .listCollections()
          .toArray()
    ).catch(err => new Error(err));
};

/**
 * @function getDocumentsPromise
 * @alias module:MongoUtils.getDocumentsPromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query.
 * @param {string} collectionName Name of the collection to query its documents.
 * @throws {Error} if uri param is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return an array with the documents of the collection.
 */
exports.getDocumentsPromise = (uri, dbName, collectionName) => {

  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  if(!collectionName || ! (collectionName instanceof String))
  {
    new Error("Collection name cannot be: " + collectionName);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(client =>
      client
        .db(dbName)
        .collection(collectionName)
        .find({})
        .limit(20)
        .sort({_id:-1})
        .toArray()
    ).catch(err => new Error(err));
};

/**
 * @function findAndDeleteOnePromise
 * @alias module:MongoUtils.findAndDeleteOnePromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query.
 * @param {string} collectionName Name of the collection to query its documents.
 * @param {string} _id The unique _id of the document to be deleted.
 * @throws {Error} if uri parameter is null, undefined or is not a string.
 * @throws {Error} if the colection name parameter is null, undefined or is not a string.
 * @throws {Error} if the unique _id parameter is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return the document deleted.
 */
exports.findAndDeleteOnePromise = (uri, dbName, collectionName, _id) => {

  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  if(!collectionName || ! (collectionName instanceof String))
  {
    new Error("Collection name cannot be: " + collectionName);
  }
  if(!_id || ! (_id instanceof String))
  {
    new Error("The unique _id of the document cannot be: " + _id);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(client =>
      client
        .db(dbName)
        .collection(collectionName)
        .findOneAndDelete({ "_id": new ObjectId(_id)})
    ).catch(err => new Error(err));
};


/**
 * @function findAndUpdateOnePromise
 * @alias module:MongoUtils.findAndUpdateOnePromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query.
 * @param {string} collectionName Name of the collection to query its documents.
 * @param {string} _id The unique _id of the document to be updated.
 * @param {Object} newObject The updated object to set in MongoDB.
 * @throws {Error} if uri parameter is null, undefined or is not a string.
 * @throws {Error} if the colection name parameter is null, undefined or is not a string.
 * @throws {Error} if the unique _id parameter is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return the non updated object.
 */
exports.findAndUpdateOnePromise = (uri, dbName, collectionName, _id, newObject) => {

  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  if(!collectionName || ! (collectionName instanceof String))
  {
    new Error("Collection name cannot be: " + collectionName);
  }
  if(!_id || ! (_id instanceof String))
  {
    new Error("The unique _id of the document cannot be: " + _id);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(client =>
      client
        .db(dbName)
        .collection(collectionName)
        .findOneAndUpdate({ "_id": new ObjectId(_id)}, { $set: newObject})
    ).catch(err => new Error(err));
};

/**
 * @function findOnePromise
 * @alias module:MongoUtils.findOnePromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query.
 * @param {string} collectionName Name of the collection to query its documents.
 * @param {string} _id The unique _id of the document to be found.
 * @throws {Error} if uri parameter is null, undefined or is not a string.
 * @throws {Error} if the colection name parameter is null, undefined or is not a string.
 * @throws {Error} if the unique _id parameter is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return the object.
 */
exports.findOnePromise = (uri, dbName, collectionName, _id) => {

  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  if(!collectionName || ! (collectionName instanceof String))
  {
    new Error("Collection name cannot be: " + collectionName);
  }
  if(!_id || ! (_id instanceof String))
  {
    new Error("The unique _id of the document cannot be: " + _id);
  }
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client
    .connect()
    .then(client =>
      client
        .db(dbName)
        .collection(collectionName)
        .find({ "_id": new ObjectId(_id)})
        .toArray()
    ).catch(err => new Error(err));
};

/**
 * @function createOneDocumentPromise
 * @alias module:MongoUtils.createOneDocumentPromise
 * @param {string} uri MongoDB URI to connect to the database.
 * @param {string} dbName Name of the database to query.
 * @param {string} collectionName Name of the collection to query its documents.
 * @param {Object} object The object to be inserted in the database.
 * @throws {Error} if uri parameter is null, undefined or is not a string.
 * @throws {Error} if the colection name parameter is null, undefined or is not a string.
 * @throws {Error} if the connection could be established.
 * @returns {Promise} Promise which will return the object.
 */
exports.createOneDocumentPromise = (uri, dbName, collectionName, object) => {

  if(!uri || ! (uri instanceof String))
  {
    new Error("MongoDB URI cannot be: " + uri);
  }
  if(!dbName || ! (dbName instanceof String))
  {
    new Error("Database name cannot be: " + dbName);
  }
  if(!collectionName || ! (collectionName instanceof String))
  {
    new Error("Collection name cannot be: " + collectionName);
  }

  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return client
    .connect()
    .then(client =>
      client
        .db(dbName)
        .collection(collectionName)
        .insertOne(object)
    ).catch(err => new Error(err));
};