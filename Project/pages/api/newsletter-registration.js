import { MongoClient } from 'mongodb';

async function connectDB() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();
  const result = await db.collection('emails').insertOne(document);
  return result;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // some validation
    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    let client;
    // store it in a database
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: userEmail });
  }
}
