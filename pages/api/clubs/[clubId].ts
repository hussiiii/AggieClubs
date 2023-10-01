import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { clubId } = req.query;

      const clubsFilePath = path.join(process.cwd(), 'data', 'clubs.json');
      const clubsData = JSON.parse(fs.readFileSync(clubsFilePath, 'utf8'));
      const club = clubsData.find((c: any) => c.id === clubId);

      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }

      res.status(200).json(club);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch club details' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
