import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../../firebase.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Use Firebase auth to create a new user 
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(username, password);
      const user = userCredential.user;

      if (user) {
        // The user has been registered successfully
        return res.status(201).json({ message: 'User registered successfully!' });
      } else {
        return res.status(400).json({ error: 'Failed to register user' });
      }
    } catch (error) {
      // Handle Firebase errors
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
