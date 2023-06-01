import type { NextApiRequest, NextApiResponse } from 'next';
import { mapInfo } from '@/utils/mocks';
import { type MapInfo } from '@/types/map';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MapInfo>
) {
    res.status(200).json(mapInfo);
}
