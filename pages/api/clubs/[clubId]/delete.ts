import { db } from '../../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { clubId } = req.query;

      // Delete all events associated with the club
      const eventsSnapshot = await db.collection('events').where('clubId', '==', clubId).get();
      const batch = db.batch();
      eventsSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // Delete the club
      await db.collection('clubs').doc(clubId as string).delete();

      res.status(200).json({ message: 'Club and its associated events deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete club and its associated events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
