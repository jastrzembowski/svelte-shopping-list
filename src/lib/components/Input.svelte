<script lang="ts">
	import type { List } from '$lib/models';
	import { createList } from '$lib/utils';

	let { className, placeholder, lists = $bindable() , fetchLists = $bindable() } = $props<{ className: string, placeholder: string, lists: List[], fetchLists: () => void }>();

	let name = $state('');

	async function handleInput() {
		if (!name.trim()) {
			return;
		}
		const newList = await createList(name);

		name = '';
		fetchLists();
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
	╋
	</button>
</div>