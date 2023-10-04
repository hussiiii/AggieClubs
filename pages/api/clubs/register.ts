import { db } from '../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, description, profilePicture } = req.body;

      // Create a new club document in Firestore & get ref
      const clubDocRef = await db.collection('clubs').add({
        name,
        description,
        profilePicture
      });

      // Update the club document to set its id field to match the Firestore doc ID (dumb)
      await clubDocRef.update({
        id: clubDocRef.id
      });

      // Fetch the updated club document
      const clubDoc = await clubDocRef.get();

      res.status(201).json(clubDoc.data());
    } catch (error) {
      res.status(500).json({ error: 'Unable to register club' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
