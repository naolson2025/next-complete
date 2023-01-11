import { MongoClient } from 'mongodb';

async function connectDB() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  return client;
}

async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}

export default async function handler(req, res) {
  const { eventId } = req.query;

  let client;

  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    // some validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
  
      res.status(201).json({ message: 'Comment Posted', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        // { _id: -1 } is a MongoDB sort by descending operator
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }

  client.close();
}
