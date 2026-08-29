import {useQuery} from "@tanstack/react-query"
import {getAyaForYou} from "./ayaForYou.api"

export const useAyaForYou = () => {
    return useQuery({
        queryKey: ['aya-for-you'],
        queryFn: getAyaForYou
    })
}