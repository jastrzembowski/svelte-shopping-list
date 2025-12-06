<script lang="ts">
	import type { List } from '$lib/models/list';
	import { Product } from '$lib/components';
	import { deleteList, updateListName, addItemToList, deleteItemFromList, editItemFromList } from '$lib/utils';
	let { list = $bindable() , fetchLists = $bindable() } = $props<{ list: List, fetchLists: () => void }>();
	let newItemName = $state('');
	let newItemQuantity = $state('1');

	async function removeList(id: string) {
		await deleteList(id);
		fetchLists();
	}

	async function changeName(name: string) {
		if (!name.trim()) {
			return;
		}
		await updateListName(list.id, name);
		list.name = name;
		isInputChanged = false;
		fetchLists();
	}

	async function addItem(e: Event) {
		e.preventDefault();
		if (!newItemName.trim()) {
			return;
		}
		await addItemToList(list.id, newItemName, newItemQuantity);
		newItemName = '';
		newItemQuantity = '1';
		fetchLists();
	}

	async function deleteItem(productId: string) {
		await deleteItemFromList(list.id, productId);
		fetchLists();
	}

	async function editItem(productId: string, name: string, quantity: string) {
		await editItemFromList(list.id, productId, name, quantity);
		fetchLists();
	}



	let isInputChanged = $state(false);
let products = $state(list.products);



let isButtonDisabled = $derived(newItemName.trim() === '' || newItemQuantity.trim() === '');

</script>

<div class="border rounded p-8 bg-white shadow-md min-h-[300px] flex flex-col min-w-[550px]" style="height: fit-content;">
	<div class="flex justify-between items-center mb-4">
		<div class="flex items-center gap-2 w-full">
			<input
				type="text"
				bind:value={list.name}
				oninput={() => (isInputChanged = true)}
				class="text-2xl w-full font-bold border-none outline-none text-black"
			/>
			<button
				disabled={!isInputChanged}
				class="bg-white text-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 disabled:opacity-0"
				onclick={() => changeName(list.name)}
				type="button"
			>
				✓
			</button>
		</div>
		<button
			class="bg-white text-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
			onclick={() => removeList(list.id)}
			type="button"
		>
			X
		</button>
	</div>

	<form class="flex gap-2 mb-4 w-full" onsubmit={addItem}>
		<input
			class="border rounded px-3 py-2 text-black w-full"
			bind:value={newItemName}
			placeholder="Dodaj produkt..."
		/>
		<input
			type="text"
			bind:value={newItemQuantity}
			class="border rounded px-3 py-2 text-blacke text-black w-16"
		/>
		<button disabled={isButtonDisabled}
			class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 disabled:opacity-50 disabled:cursor-default"
			type="submit"
		>
			+
		</button>
	</form>

	<div class="space-y-2">
		{#each products as product (product.id)}


		<Product product={product} editItem={editItem} deleteItem={deleteItem} listId={list.id} />
		{/each}
		{#if list.products.length === 0}
			<span class="text-gray-400 italic text-center">Nie ma jeszcze żadnych przedmiotów. Dodaj jeden powyżej!</span>
		{/if}
	</div>
</div>
