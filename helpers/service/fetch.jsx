import { env } from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const errorAPI = {
    error: true,
    status: 400,
    message: 'APP REQUEST FAIL',
    description: 'The request failed, contact the app developer info@dtrinidad.com or go to www.dtrinidad.com'
};

export const getLatestCurrencyExchange = async () => {
    try {
        const base_url = `${env.REACT_BASE_URL}/latest.json`;
        const api_key = `app_id=${env.REACT_KEY}`;

        const request = await fetch(
            `${base_url}?${api_key}`,
            { method: 'GET' }
        );

        const response = await request.json();
        const responseText = JSON.stringify(response);
        await AsyncStorage.setItem('@myDataRequest', responseText);
        return response;

        // return await request.json();
    } catch (error) {
        console.error(error);
        return errorAPI;
    }
}

// Cuenta gratuira no permite la peticion
export const getConvertQuantity = async (from, to, value) => {
    try {
        const base_url = `${env.REACT_BASE_URL}/convert`;
        const api_key = `app_id=${env.REACT_KEY}`;

        const request = await fetch(
            `${base_url}?${value}/${from}/${to}?${api_key}`,
            { method: 'GET' }
        );

        return await request.json();
    } catch (error) {
        console.error(error);
        return errorAPI;
    }
};