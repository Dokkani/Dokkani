import axios from 'axios';
import constant from '../constant';
import qs from 'qs';

/**
 * @param {string} email
 * @param {string} password
 */
const postUser = user => {
    let options = {
        method: 'POST',
        data: user,
        url: `${constant.API_BASE_URL}/users/signup`,
    };
    return axios(options);
};
const fetchToken = (email, password) => {

    if (!email) {
        throw new TypeError('`fetchToken`: improper `email` passed');
    }
    if (!password) {
        throw new TypeError('`fetchToken`: improper `password` passed');
    }
    let data = {
        email: email.toLowerCase(),
        password: password
    };
    let options = {
        method: 'POST',
       // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: `${constant.API_BASE_URL}/users/login`,
    };
    try {
        console.log('Apiaxios', options);
        return axios(options);
    }
    catch (error) {
        console.log('ApiError :', error);
    }
};
const getItems = (distance, start_location, end_location) => {
    if (distance == null) {
        let options = {
            method: 'POST',
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${start_location}&destinations=${end_location}&key=${constant.PLACES_KEY}`
        };
        try {
            console.log('axios google distance matrix', options);
            axios(options)
                .then(response => {
                    console.log(response);
                    return;
                });
        }
        catch {
            console.log('api error: ', error);
        }
    }
}

export const Api = {
    fetchToken,
    postUser,
    getItems
};
