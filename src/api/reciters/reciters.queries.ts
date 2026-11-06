import { useQuery } from "@tanstack/react-query";
import { getReciters } from './reciters.api';

export const useGetReciters = () =>{
    return useQuery({
        queryKey: ['reciters'],
        queryFn: getReciters
    })
}