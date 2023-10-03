// api/clubs/[clubId]/delete.ts

import { db } from '../../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { clubId } = req.query;
      await db.collection('clubs').doc(clubId as string).delete();
      res.status(200).json({ message: 'Club deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete club' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
