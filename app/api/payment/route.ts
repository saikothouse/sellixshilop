import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const orderData = req.body;

  try {
    const { data } = await axios.post('https://dev.sellix.io/orders', orderData, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SELLIX_API_KEY}`,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
};
