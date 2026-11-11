import { radio_api } from './../api';
import { RadioChannel } from '../../types/radio.types';

export const getRadios = async () : Promise<RadioChannel[]>=>{
    const response = await radio_api.get('/');
    return response.data.radios;
}