import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    // some validation
    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    // store it in a database
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: userEmail });
  }
}
