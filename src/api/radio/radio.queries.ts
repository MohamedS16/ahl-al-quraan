import { getRadios } from './radio.api';
import { useQuery } from '@tanstack/react-query';

export const useRadios = () => {
    return useQuery({
        queryKey: ['radios'],
        queryFn: getRadios
    })
}