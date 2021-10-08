import { headers, getOptionsWithToken, fetchData, getOptionsWithoutToken } from ".";

async function authenticate(user, auth) {
    const options = getOptionsWithoutToken('POST', headers, user);

    const res = auth ? await fetchData(`/users/`, options) :
        await fetchData(`/users/registration`, options);

    return await res.json();
};

async function signOut(id, token) {
    const options = getOptionsWithToken('POST', headers, token);

    return await fetchData(`/users/signout/${id}`, options);
}

export { authenticate, signOut }