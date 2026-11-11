import { gallery_api } from "./../api";
import { type IslamicVideo } from "../../types/gallery.types";

type GalleryResponse = Record<string, IslamicVideo[]>;

export const getGallery = async () : Promise<GalleryResponse>=>{
    const response = await gallery_api.get("/");
    return response.data.tadabor;
}