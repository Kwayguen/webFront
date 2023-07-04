<script>
	import { count } from './store.js';

	function reset() {
		count.set(0);
	}
</script>

<button class="btn btn-info" on:click={reset}> reset </button>