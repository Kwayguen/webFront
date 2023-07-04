<script>
	import { count } from './store.js';

	function reset() {
		count.set(0);
	}
</script>

<button class="btn" on:click={reset}> reset </button>