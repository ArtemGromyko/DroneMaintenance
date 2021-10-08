import { headers, getOptionsWithToken, fetchData, createUrlWithId, getOptionsWithoutToken } from ".";

const url = '/orders/';

async function getOrders() {
    const options = getOptionsWithoutToken('GET', headers);
    const res = await fetchData(url, options);

    return res.json();
}

export { getOrders }