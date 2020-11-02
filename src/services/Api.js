import axios from 'axios';

const TOKEN = "JWT_TOKEN";
const API_URL = process.env.VUE_APP_API;

async function getUrl(url) {
    return axios.get(url, { 
        headers: getHeaders()
    });
}

async function get(action) {
    return axios.get(`${API_URL}${action}`, {
        headers: getHeaders()
    });
}

async function getWithArguments(action, args) {
    if (args.length > 0) {
        action += '?';
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            action += `${element.key}=${element.value}`;
            if (index !== args.length-1) {
                action += '&';
            }
        }
    }
    return axios.get(`${API_URL}${action}`, {
        headers: getHeaders()
    });
}

async function getSingle(action, id) {
    return axios.get(`${API_URL}${action}/${id}`, {
        headers: getHeaders()
    });
}

async function post(action, payload) {
    return axios.post(`${API_URL}${action}`, 
        payload, 
        {
            headers: getHeaders(),
        }
    )
}

async function put(action, id, payload) {
    return axios.post(`${API_URL}${action}/${id}`, {
        headers: getHeaders(),
        body: payload
    })
}

function getHeaders() {
    return {
        Authorization: `Bearer ${TOKEN}`,
    }
}

const Api = {
    getUrl,
    get,
    getWithArguments,
    getSingle,
    post,
    put
};
export default Api;