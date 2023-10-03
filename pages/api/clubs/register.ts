import { db } from '../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, description, profilePicture } = req.body;
      const newClub = {
        id: new Date().toISOString(),
        name,
        description,
        profilePicture
      };

      const clubDocRef = await db.collection('clubs').add(newClub);
      const clubDoc = await clubDocRef.get();

      res.status(201).json(clubDoc.data());
    } catch (error) {
      res.status(500).json({ error: 'Unable to register club' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
