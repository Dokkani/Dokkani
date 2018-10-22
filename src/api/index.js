import axios from 'axios';
import constant from '../constant';
import qs from 'qs';

/**
 * @param {string} username
 * @param {string} password
 */
const fetchToken = (username, password) => {

    if (!username) {
        throw new TypeError('`fetchToken`: improper `username` passed');
    }
    if (!password) {
        throw new TypeError('`fetchToken`: improper `password` passed');
    }
    let data = {
        username: username.toLowerCase(),
        password: password,
        grant_type: 'password',
        client_id: constant.API_KEY_COMFREIGHT,
    };
    let options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: `${constant.API_BASE_URL}/o/token/`,
    };
    try {
        console.log('Apiaxios', options);
        return axios(options);
    }
    catch (error) {
        console.log('ApiError', error);
    }
};

export const Api = {
    fetchToken,
};
