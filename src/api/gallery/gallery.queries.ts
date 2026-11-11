import { useQuery } from "@tanstack/react-query";
import { getGallery } from "./gallery.api";

export const useGetGallery = () => {
    return useQuery({
        queryKey: ["gallery"],
        queryFn: getGallery,
    })
}