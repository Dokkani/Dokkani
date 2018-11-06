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
const get_all_posts= () => {
    let options = {
        method: 'GET',
        url: `${constant.API_BASE_URL}/posts/`,
    };
    return axios(options);
};
const postNewItem = item => {
    let options = {
        method: 'POST',
        data: item,
        headers: {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViY2UyMDYwYTFmNmI3MDAxNTViYTZmNSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvMzVjOWRiN2Y5NWZmY2FjMzQ0ZGQ3Y2ZhNjdlMTY0YmI_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTQxNDc5MDE0LCJleHAiOjE1NDE0ODI2MTR9.Cmp6TVaXpDYYIFtVELyQt-4YV1OYKKPht6Q5fZ3I8SE',},
        url: `${constant.API_BASE_URL}/posts`,
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

export const Api = {
    fetchToken,
    postUser,
    postNewItem,
    get_all_posts,
};
