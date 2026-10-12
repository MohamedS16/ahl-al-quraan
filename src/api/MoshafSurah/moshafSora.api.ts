import {moshaf_sora_api} from './../api';

export const getMoshafSora = async(soraId : string)=>{
    const {data} = await moshaf_sora_api.get(`/${soraId}`);
    return data.data;
}

