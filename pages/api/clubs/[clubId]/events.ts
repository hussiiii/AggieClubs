import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clubId } = req.query;

  if (req.method === 'POST') {
    try {
      const { eventName, description, eventDate, picture, location } = req.body;

      // Read the events.json file
      const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
      const eventData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf8'));

      // Add new event
      const newEvent = {
        id: new Date().toISOString(),
        clubId,
        eventName,
        description,
        eventDate,
        picture,
        location
      };
      eventData.push(newEvent);

      // Write back to the file
      fs.writeFileSync(eventsFilePath, JSON.stringify(eventData));

      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Unable to post event' });
    }
  } else if (req.method === 'GET') {
    try {
      const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
      const eventData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf8'));
      const clubEvents = eventData.filter((event: any) => event.clubId === clubId);
      res.status(200).json(clubEvents);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
