

<script>
  import PicPicker from "./picPicker.svelte";
  

  let panier = [];

  let menuOpen = false;
  function toggleMenu() {
      menuOpen = !menuOpen;
  }
</script>

<body>
  <main>
    <h1>Pick Cats Pics Page</h1>
    <button class="btn btn-primary" on:click={toggleMenu} >{menuOpen}</button>
    <section>
      {#if menuOpen}
        <PicPicker />
      {/if}
    </section>
  </main>
</body>

