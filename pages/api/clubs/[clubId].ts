import { db } from '../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { clubId } = req.query;

      // Ensure that clubId is a string
      const clubIdString = Array.isArray(clubId) ? clubId[0] : clubId;

      const clubDoc = await db.collection('clubs').doc(clubIdString).get();

      if (!clubDoc.exists) {
        return res.status(404).json({ error: 'Club not found' });
      }

      res.status(200).json(clubDoc.data());
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch club details' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
