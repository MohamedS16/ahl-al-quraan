import {getMoshafSora} from './moshafSora.api';
import { useQuery } from "@tanstack/react-query";

export const useMoshafSora = (soraId: string) => {
    return useQuery({
        queryKey: ["moshaf-sora", soraId],
        queryFn: () => getMoshafSora(soraId),
    })
}