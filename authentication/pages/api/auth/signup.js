import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

// this example doesn't have error handling
// becuase it's not the focus of this example
// this example focus is on auth, but error handling should be included
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;
  
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }
  
    const client = await connectToDatabase();
    const db = client.db();

    // check if user already exists
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }
  
    const hashedPassword = await hashPassword(password);
    const result = db.collection('users').insertOne({
      email,
      hashedPassword
    });
  
    res.status(201).json({ message: 'Created user!' });
    client.close();
  }

}

export default handler;
