import { createContext } from 'react';
import { Complex } from '@/types';

type ComplexInfoContextValue = {
    data: Complex | null;
    isLoading: boolean;
    error: any;
};

export const ComplexInfoContext = createContext<ComplexInfoContextValue>({
    data: null,
    isLoading: false,
    error: null,
});
