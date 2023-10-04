import { db } from '../../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const eventId = req.query.id;
      await db.collection('events').doc(eventId as string).delete();        
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
