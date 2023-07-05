<script>
	import { count } from './store';

	function decrement() {
		count.update((n) => n - 1);
	}
</script>

<button class="btn btn-secondary" on:click={decrement}> - </button>
