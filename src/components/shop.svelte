<script lang="ts">
  import { onMount } from "svelte";

  interface Album {
    id: number;
    title: string;
  }

  let panier: number[] = [];
  let albums: Album[] = [];
  let isLoading = true;

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums");
      albums = await response.json() as Album[];
      isLoading = false;
    } catch (error) {
      console.error(error);
      isLoading = false;
    }
  };

  onMount(() => fetchData());

  const addAlbum = (id: number) => {
    panier = [...panier, id];
    if (panier.length > 5) {
      alert("Attention, votre panier est trop gros");
    }
  };

  const removeAlbum = (id: number) => {
    panier = panier.filter((albumId) => albumId !== id);
  };
</script>

<div>
  {#if isLoading}
    <div>Loading albums...</div>
  {:else}
    {#each albums as album}
      <div>
        {album.title}

        {#if panier.includes(album.id)}
          <button on:click={() => removeAlbum(album.id)}>Supprimer</button>
        {:else}
          <button on:click={() => addAlbum(album.id)}>Ajouter</button>
        {/if}
      </div>
    {/each}
  {/if}
</div>
