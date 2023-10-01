import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clubsFilePath = path.join(process.cwd(), 'data', 'clubs.json');
      const clubsData = JSON.parse(fs.readFileSync(clubsFilePath, 'utf8'));
      res.status(200).json(clubsData);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch clubs' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
