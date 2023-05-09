// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { apartments } from '@/utils/mocks';
import { type Apartment } from '@/types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Apartment>
) {
    const id = req.query.id as string;
    const result = apartments.find((apt) => apt.id === id);
    if (!result) {
        res.status(404).end();
    } else {
        res.status(200).json(result);
    }
}
