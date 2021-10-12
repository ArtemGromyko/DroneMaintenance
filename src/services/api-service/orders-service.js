import { headers, getOptionsWithToken, fetchData, createUrlWithId, getOptionsWithoutToken } from ".";

const url = '/orders/';

async function getOrders(user) {
    const options = getOptionsWithToken('GET', headers, user.token);
    const res = await fetchData(url, options);

    return res.json();
}

async function getOrdersForUser(user) {
    const options = getOptionsWithToken('GET', headers, user.token);
    const res = await fetchData(`/users/${user.id}/orders`, options);

    return res.json();
}

export { getOrders, getOrdersForUser }