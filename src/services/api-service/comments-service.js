import { headers, getOptionsWithToken, fetchData, createUrl, createUrlWithId } from ".";

const url = '/comments/';
const userUrl = '/users/';

async function getComments(token) {
    const options = getOptionsWithToken('GET', headers, token);
    const res = await fetchData(url, options);

    return res.json();
}

async function getCommentsForUser(user) {
    const options = getOptionsWithToken('GET', headers, user.token);
    const res = await fetchData(createUrl(userUrl, user.id, url), options);

    return res.json();
}

async function getCommentById(token, id) {
    const options = getOptionsWithToken('GET', headers, token);

    return await fetchData(createUrlWithId(url, id), options);
}

async function getCommentForUserById(user, commentId) {
    const options = getOptionsWithToken('GET', headers, user.token);

    return await fetchData(createUrl(userUrl, user.id, url, commentId), options);
}

async function createComment(token, comment) {
    const options = getOptionsWithToken('POST', headers, token, comment);

    return await fetchData(url, options);
}

async function createCommentForUser(user, comment) {
    const options = getOptionsWithToken('POST', headers, user.token, comment);

    return await fetchData(createUrl(userUrl, user.id, url), options);
}

async function updateComment(token, commentId, comment) {
    const options = getOptionsWithToken('PUT', headers, token, comment);

    return await fetchData(createUrlWithId(url, commentId), options);
}

async function updateCommentForUser(user, commentId, comment) {
    const options = getOptionsWithToken('PUT', headers, user.token, comment);
    console.log(createUrl(userUrl, user.id, url, commentId));

    return await fetchData(createUrl(userUrl, user.id, url, commentId), options);
}

async function deleteComment(token, commentId) {
    const options = getOptionsWithToken('DELETE', headers, token);

    return await fetchData(createUrlWithId(url, commentId), options);
}

async function deleteCommentForUser(user, commentId) {
    const options = getOptionsWithToken('DELETE', headers, user.token);

    return await fetchData(createUrl(userUrl, user.id, url, commentId), options);
}

export { getComments, getCommentsForUser, getCommentForUserById, createComment, updateComment, getCommentById, deleteComment, 
    createCommentForUser, updateCommentForUser, deleteCommentForUser }