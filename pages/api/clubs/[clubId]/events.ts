import { db } from '../../../../firebase.js';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clubId } = req.query;

  if (req.method === 'POST') {
    try {
      const { eventName, description, eventDate, picture, location } = req.body;
      const newEvent = {
        clubId,
        eventName,
        description,
        eventDate,
        picture,
        location
      };

      const eventDocRef = await db.collection('events').add(newEvent);
      const eventDoc = await eventDocRef.get();

      res.status(201).json(eventDoc.data());
    } catch (error) {
      res.status(500).json({ error: 'Unable to post event' });
    }
  } else if (req.method === 'GET') {
    try {
      const eventsSnapshot = await db.collection('events').where('clubId', '==', clubId).get();
      const clubEvents = eventsSnapshot.docs.map(doc => doc.data());
      res.status(200).json(clubEvents);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
