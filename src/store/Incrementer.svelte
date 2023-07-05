<script>
	import { count } from './store';

	function increment() {
		count.update((n) => n + 1);
	}
</script>

<button class="btn btn-success" on:click={increment}> + </button>
