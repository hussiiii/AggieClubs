import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../../firebase.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  try {
    // Use Firebase authentication to verify the user's credentials
    const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
    const user = userCredential.user;

    if (user) {
      // The user has been logged in successfully
      return res.status(200).json({ message: 'Logged in successfully' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle Firebase errors
    return res.status(500).json({ error: error.message });
  }
}
