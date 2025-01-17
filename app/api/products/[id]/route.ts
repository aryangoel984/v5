// pages/api/generate-signature.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateSignature } from '@/utils/cloudinary';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { signature, timestamp } = generateSignature();
    res.status(200).json({ signature, timestamp });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
