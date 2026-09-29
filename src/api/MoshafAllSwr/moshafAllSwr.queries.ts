import { useQuery } from "@tanstack/react-query";
import { getAllMoshafSwr } from "./moshafAllSwr.api";

export const useGetAllMoshafSwr = ()=>{
    return useQuery({
        queryKey: ["moshaf-all-swr"],
        queryFn: getAllMoshafSwr
    })
}