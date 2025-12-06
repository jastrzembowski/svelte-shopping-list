<script lang="ts">
	let {
		product = $bindable(),
		editItem = $bindable(),
		deleteItem = $bindable(),
		listId = $bindable()
	} = $props<{
		product: Product;
		editItem: (productId: string, name: string, quantity: string) => void;
		deleteItem: (productId: string) => void;
		listId: string;
	}>();
	import type { Product } from '$lib/models/list';
	import { toggleIsBoughtFromList } from '$lib/utils';
	let isEditable = $state(false);

	async function toggleIsBought(productId: string, isBought: boolean) {
	await toggleIsBoughtFromList(listId, productId, isBought);
	product.isBought = isBought;
}

</script>

<form
	class="flex items-center gap-3 rounded text-black"
	onsubmit={() => editItem(product.id, product.name, product.quantity)}
>
	<input
		disabled={!isEditable}
		type="text"
		bind:value={product.name}
		class="text-lg flex-1 border-none outline-none 
		{isEditable ? 'bg-gray-200' : 'border-none'}
	
		{product.isBought
			? 'line-through text-gray-300'
			: ''}"
	/>
	<input
		disabled={!isEditable}
		type="text"
		bind:value={product.quantity}
		class="{isEditable ? 'bg-gray-200' : 'border-none'} 
		{product.isBought
			? 'line-through text-gray-300'
			: 'text-gray-500'}
		text-lg  border-none outline-none w-16 text-center"
	/>
	<button
			type="button"
			class="bg-blue-200 text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-300"
			onclick={() => toggleIsBought(product.id, !product.isBought)}
		>
        🛒
		</button>


	{#if !isEditable}
		<button
			type="button"
			onclick={() => isEditable = true}
			class="bg-yellow-200 text-black px-4 py-2 rounded cursor-pointer hover:bg-yellow-300"
		>
        ✎
		</button>
	{:else}
		<button
			type="submit"
			class="bg-green-200 text-black px-4 py-2 rounded cursor-pointer hover:bg-green-300"
		>
			✓
		</button>
	{/if}
	<button
		type="button"
		class="bg-red-200 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-300"
		onclick={() => deleteItem(product.id)}
	>
    🗑️
	</button>
</form>
