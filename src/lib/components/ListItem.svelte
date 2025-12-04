<script lang="ts">
	import type { ShoppingList } from '$lib/models/list';
	
	let { list } = $props<{ list: ShoppingList }>();
	let newItemName = $state('');
	

	function addItem() {
		if (!newItemName.trim()) {
			return;
		}

        list.items.push({
            id: list.items.length + 1,
            name: newItemName,
            done: false
        });
		newItemName = '';
	}

</script>

<div class="border rounded p-8 bg-white shadow-md">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-2xl font-bold">{list.name}</h2>
		
	</div>
	
	<div class="flex gap-2 mb-4">
		<input
			class="border rounded px-3 py-2 flex-1 text-black"
			bind:value={newItemName}
			placeholder="Add item..."
			onkeydown={(e) => { if (e.key === 'Enter') addItem(); }}
		/>
		<button
			class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
			onclick={addItem}
			type="button"
		>
			+
		</button>
	</div>

	<ul class="space-y-2">
		{#each list.items as item (item.id)}
			<li class="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
		
				<span class="text-lg flex-1 {item.done ? 'line-through text-gray-500' : ''}">
					{item.name}
				</span>
				
			</li>
		{/each}
		{#if list.items.length === 0}
			<li class="text-gray-400 italic">Nie ma jeszcze żadnych przedmiotów. Dodaj jeden powyżej!</li>
		{/if}
	</ul>
</div>
