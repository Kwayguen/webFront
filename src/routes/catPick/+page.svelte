

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
    <button on:click={toggleMenu} >{menuOpen}</button>
    <section>
      <PicPicker />
    </section>
  </main>
</body>

