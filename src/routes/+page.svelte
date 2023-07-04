
<script lang="ts">
  import { count } from '../store/store.js';
  import Lifecycle from '../components/albums.svelte';

  let countValue: any;
  count.subscribe((value) => {
    countValue = value;
  });

</script>
<body>
  <main>
    <h1 class="font-bold text-xxl">Welcome to My Website</h1>
    <h1>The count is {countValue}</h1>
    <Lifecycle />
  </main>
</body>
<style>
</style>
  