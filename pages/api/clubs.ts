import { db } from '../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clubsCollection = db.collection('clubs');
      const clubsSnapshot = await clubsCollection.get();
      const clubsData = clubsSnapshot.docs.map(doc => doc.data());
      res.status(200).json(clubsData);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch clubs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
