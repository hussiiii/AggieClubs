import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, description, profilePicture } = req.body;

      // Read the clubs.json file
      const clubsFilePath = path.join(process.cwd(), 'data', 'clubs.json');
      const clubsData = JSON.parse(fs.readFileSync(clubsFilePath, 'utf8'));

      // Add new club
      const newClub = {
        id: new Date().toISOString(),
        name,
        description,
        profilePicture
      };
      clubsData.push(newClub);

      // Write back to the file
      fs.writeFileSync(clubsFilePath, JSON.stringify(clubsData));

      res.status(201).json(newClub);
    } catch (error) {
      res.status(500).json({ error: 'Unable to register club' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
