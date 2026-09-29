import { moshaf_all_swr_api } from "../api";

export const getAllMoshafSwr = async()=>{
    const { data} = await moshaf_all_swr_api.get("/");
    return data.data.surahs
}