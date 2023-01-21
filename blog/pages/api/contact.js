import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    // these env variables are set in next.config.js
    // const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    console.log(process.env.MONGO_URI);
    let client;
    try {
      client = await MongoClient.connect(process.env.MONGO_URI)
    } catch (error) {
      res.send(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db()

    try {
      const result = await db.collection('messages').insertOne(newMessage)
      newMessage.id = result.insertedId
    } catch (error) {
      client.close()
      res.send(500).json({ message: 'Storing message failed.' });
      return;
    }

    client.close()

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
