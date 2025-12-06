import { clientFetch, ENDPOINTS } from './';

export async function getLists() {
	const data = await clientFetch(ENDPOINTS.LIST);
	return data;
}

export async function getListById(id: string) {
	const data = await clientFetch(`${ENDPOINTS.LIST}/${id}`);
	return data;
}

export async function createList(name: string) {
	const data = await clientFetch(`${ENDPOINTS.LIST_CREATE}`, {
		method: 'POST',
		body: JSON.stringify({ name })
	});
	return data;
}

export async function updateListName(id: string, name: string) {
	const data = await clientFetch(`${ENDPOINTS.LIST_UPDATE}/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ name })
	});
	return data;
}

export async function deleteList(id: string) {
	const data = await clientFetch(`${ENDPOINTS.LIST_DELETE}/${id}`, {
		method: 'DELETE'
	});
	return data;
}

export async function addItemToList(id: string, name: string, quantity: string) {
	const data = await clientFetch(`${ENDPOINTS.LIST_ADD_ITEM.replace('{id}', id)}`, {
		method: 'POST',
		body: JSON.stringify({ name, quantity })
	});
	return data;
}


export async function editItemFromList(id: string, productId: string, name?: string, quantity?: string, isBought?: boolean) {
	await clientFetch(`${ENDPOINTS.LIST_EDIT_ITEM.replace('{id}', id).replace('{productId}', productId)}`, {
		method: 'PATCH',
		body: JSON.stringify({ name, quantity, isBought })
	});
	return;
}

export async function toggleIsBoughtFromList(id: string, productId: string, isBought: boolean) {
	await clientFetch(`${ENDPOINTS.LIST_EDIT_ITEM.replace('{id}', id).replace('{productId}', productId)}`, {
		method: 'PATCH',
		body: JSON.stringify({ isBought: isBought })
	});
	return;
}


export async function deleteItemFromList(id: string, productId: string) {
	await clientFetch(`${ENDPOINTS.LIST_DELETE_ITEM.replace('{id}', id).replace('{productId}', productId)}`, {
		method: 'DELETE'
	});
	return;
}