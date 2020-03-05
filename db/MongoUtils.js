const MongoClient = require("mongodb").MongoClient;
// Connection url

const dbName = "rentsy";


function getCollectionPromise () {
  const url = 'mongodb://localhost:27017/' + dbName;
  const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

return client
    .connect()
    .then(
      client =>
      client
      .db(dbName)
      .listCollections()
      .toArray()
    );
}

function getDatabasesPromise() {
  const url = 'mongodb://localhost:27017/' + dbName;
  const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

return client
.connect()
.then(
  client =>
  client
  .db()
  .admin()
  .listDatabases()
  .toArray()
);
  
}



exports.getCollectionPromise = getCollectionPromise;
exports.getDatabasesPromise = getDatabasesPromise;