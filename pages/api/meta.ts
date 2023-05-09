import type { NextApiRequest, NextApiResponse } from 'next';
import { complex } from '@/utils/mocks';
import { type Complex } from '@/types';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Complex>
) {
    res.status(200).json(complex);
}
