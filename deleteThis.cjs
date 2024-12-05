const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

async function findAndLogDocument(objectIdString) {
  try {
    // Replace 'your_connection_string' with your actual connection string
    const client = await mongodb.MongoClient.connect('your_connection_string');
    const db = client.db('your_database_name');
    const collection = db.collection('your_collection_name');

    const objectId = new ObjectId(objectIdString);
    const document = await collection.findOne({ _id: objectId });

    console.log(document);

    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage:
const objectIdToFind = 'your_object_id_here';
findAndLogDocument(objectIdToFind);
