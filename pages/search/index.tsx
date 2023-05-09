import ApartmentInfo from '@/components/AparmentInfoModal';
import { useRouter } from 'next/router';

export default function Search() {
    const router = useRouter();

    return router.query.apartmentId ? <ApartmentInfo /> : null;
}
