import {reciters_api} from './../api';

const getRecitersSwr = async (reciterId) =>{
    const { data } = await reciters_api.get('?reciter=');
    return data;
}