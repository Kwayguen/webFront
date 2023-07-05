<script>
	import { count } from './store';

	function reset() {
		count.set(0);
	}
</script>

<button class="btn btn-info" on:click={reset}> reset </button>