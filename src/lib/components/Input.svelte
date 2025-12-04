<script lang="ts">
	import type { ShoppingList } from '$lib/models/list';

	let { className, placeholder, lists = $bindable() } = $props<{ className: string, placeholder: string, lists: ShoppingList[] }>();

	let name = $state('');

	function handleInput() {
		if (!name.trim()) {
			return;
		}
		lists.push({
			id: lists.length + 1,
			name,
			items: []
		});
		name = '';
	}
</script>

<div class="flex self-center">
	<input
		class={`border rounded px-3 py-2 ${className} w-96 h-15 text-black text-lg`}
		bind:value={name}
		placeholder={placeholder}
		onkeydown={(e) => { if (e.key === 'Enter') handleInput(); }}
	/>
	<button
		class="bg-blue-500 text-white px-3 w-15 h-15 rounded cursor-pointer"
		onclick={handleInput}
		type="button"
	>
		+
	</button>
</div>