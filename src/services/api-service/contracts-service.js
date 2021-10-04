import { headers, getOptionsWithToken, fetchData, postResource, getAuthorization, createUrl } from ".";

const url = '/contracts/';

async function getContracts(token) {
    const options = getOptionsWithToken('GET', headers, token);
    const res = await fetchData(url, options);

    return res.json();
}

async function createContract(token, contract) {
    const options = getOptionsWithToken('POST', headers, token, contract);

    return await fetchData(url, options);
}

async function addSparePartForContractAsync(token, contractId, contractPart) {
    const options = getOptionsWithToken('POST', headers, token, contractPart);

    return await fetchData(createUrl(url, contractId, '/parts'), options);
}

export { getContracts, createContract, addSparePartForContractAsync }