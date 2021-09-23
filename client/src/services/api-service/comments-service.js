import { headers, getOptions, fetchData, postResource, getAuthorization } from ".";

const url = '/comments';

async function getComments(token) {
    const options = getOptions('GET', headers, token);

    return await fetchData(url, options);
}

async function createComment(token, comment) {
    const options = getOptions('POST', headers, token, comment);

    return await postResource(url, options);
}

export { getComments, createComment }