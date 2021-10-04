import { headers, getOptionsWithToken, fetchData, createUrl } from ".";

const requestUrl = '/requests/';
const userUrl = '/users/';

function createUrlForRequests({role, id}, requestId) {
    const url =  role === 'admin' ?
        requestUrl : createUrl(userUrl, id, requestUrl);

    return `${url}${requestId ?? ''}`;
}

async function getRequests(user) {
    const options = getOptionsWithToken('GET', headers, user.token);
    const res = await fetchData(createUrlForRequests(user), options);

    return res.json();
}

async function createRequest(user, request) {
    request.userId = user.id;
    request.droneId = '9fffa88b-91c5-42a6-8692-1fd8701fb0e4';
    const options = getOptionsWithToken('POST', headers, user.token, request);

    return await fetchData(createUrlForRequests(user), options);
}

async function updateRequest(user, requestId, request) {
    request.userId = user.id;
    request.droneId = '9fffa88b-91c5-42a6-8692-1fd8701fb0e4';
    const options = getOptionsWithToken('PUT', headers, user.token, request);

    return await fetchData(createUrlForRequests(user, requestId), options);
}

async function deleteRequest(user, requestId) {
    const options = getOptionsWithToken('DELETE', headers, user.token);

    return await fetchData(createUrlForRequests(user, requestId), options);
}

export { getRequests, createRequest, updateRequest, deleteRequest }