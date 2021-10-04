import HttpError from './../../errors/HttpError';

const _apiBase = 'https://localhost:5001/api';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const postOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

function createUrlWithId(url, id) {
    return `${url}${id}`;
}

function createUrl(parent, id, child, childId) {
    return `${parent}${id}${child}${childId ?? ''}`;
}

function getAuthorization(token) {
    return { authorization: `Bearer ${token}` };
}

function getOptionsWithToken(method, headers, token, body) {
    const options = {
        method: method,
        headers: headers ? {...headers, ...getAuthorization(token)} : getAuthorization(token),
        body: JSON.stringify(body)
    }

    return options;
}

function getOptionsWithTokenWithoutToken(method, headers, body) {
    const options = {
        method: method,
        headers: headers ?? undefined,
        body: body ? JSON.stringify(body) : undefined
    }

    return options;
}

async function fetchData(url, options) {
    const response = await fetch(`${_apiBase}${url}`, options);

    if (!response.ok) {
        throw new HttpError('Sorry, something went wrong(', response.status);
    }

    return response;
}

async function postResource(url, options = null) {
    return await fetch(`${_apiBase}${url}`, options);
}

const getPostOptionsWithToken = (token, body) => {
    const options = { ...postOptions };
    options.headers = {
        ...options.headers, 'Authorization': 'Bearer ' + token, 'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
};

const getPostOptionsWithBody = (body) => ({ ...postOptions, body: JSON.stringify(body) });

const getRequestsForUser = async (id, token) => {
    console.log(id);
    return await fetchData(`/models/`, { headers: { authorization: 'Bearer ' + token } });
}

const authenticate = async (user, auth) => {
    return auth ? await postResource(`/users/`, getPostOptionsWithBody(user)) :
        await postResource(`/users/registration`, getPostOptionsWithBody(user));
};

const signOut = async (id, token) =>
    await postResource(`/users/signout/${id}`, getPostOptionsWithToken(token));

const deleteRequestForUser = async (id, token) => {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    return await fetch(`${_apiBase}/models/${id}`, deleteOptions);
}

const createRequestForUser = async (id, token, createdmodel) => {

    createdmodel.userId = id;
    createdmodel.droneId = '9fffa88b-91c5-42a6-8692-1fd8701fb0e4';

    console.log(createdmodel);

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(createdmodel)
    };

    console.log(options);

    return await fetch(`${_apiBase}/models/`, options);
}

const updateRequestForUser = async (id, token, modelId, updatedmodel) => {
    updatedmodel.userId = id;
    updatedmodel.droneId = '9fffa88b-91c5-42a6-8692-1fd8701fb0e4';

    console.log(updatedmodel);

    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(updatedmodel)
    };

    return await fetch(`${_apiBase}/models/${modelId}`, options);
}

const getAllComments = async (token) =>
    await fetchData('/comments/', { headers: { authorization: 'Bearer ' + token } });

const getAllDrones = async (token) =>
    await fetchData('/drones/', { headers: { authorization: 'Bearer ' + token } });

export {
    getAllDrones,
    authenticate, signOut, getRequestsForUser, deleteRequestForUser, createRequestForUser, updateRequestForUser, getAllComments,
    _apiBase, postOptions, getPostOptionsWithToken, getPostOptionsWithBody, fetchData, getOptionsWithToken, headers, getAuthorization, postResource,
    createUrl, createUrlWithId, getOptionsWithTokenWithoutToken
};