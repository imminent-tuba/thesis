const mongodb = require('mongodb');

// 27017 is the default port for connecting to MongoDB
const server = new mongodb.Server('127.0.0.1', 27017, {});
const client = new mongodb.Db('ChatAnalysis', server);

// Open the client's connection to the server:
client.open((err, pClient) => {
  console.log('Connected to MongoDB!');

  // Create a collection, if it doesn't exist already:
  client.createCollection('demo-collection', (err, collection) => {
    console.log('Created collection');

    // Here's the document we want to insert:
    const document = { name: 'Jean Valjean', password: '24601' };

    // Insert it to the collection:
    collection.insert(document, function(err, docs) {
      console.log('Inserted a document.');

      // Count just gives us the number of items in collection:
      collection.count(function(err, count) {
        console.log('This collection contains ' + count + ' documents.');
      });

      // Find() returns a "cursor" which can be converted to an array of
      // documents:
      collection.find().toArray(function(err, results) {
        // Results is an array of all the documents in the collection
        for (let i = 0; i < results.length; i++) {
          console.log('Found a document with name = ' + results[i].name);
        }
        // Close the db connection when we're done with it:
        client.close();
        console.log('Closed the collection');
      });
    });
  });
});

// module.exports = connection;

