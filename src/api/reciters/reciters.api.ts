import {reciters_api} from './../api';
import {recitersResponse} from "../../types/reciters.types";

export const getReciters = async () => {
    const { data }  = await reciters_api.get<recitersResponse>('/');
    return data.reciters;
}
