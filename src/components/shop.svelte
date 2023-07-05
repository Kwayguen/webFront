<script lang="ts">
  import { onMount } from "svelte";
  import { panier } from '../store/store.js';

  interface Album {
    id: number;
    title: string;
  }

  // let panier: number[] = [];
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
    
    if ($panier.length >= 5) {
      alert("Attention, votre panier est trop gros");
    } else {
      panier.update((p) => [...p, id]);
    }
  };

  const removeAlbum = (id: number) => {
    panier.update((p) => p.filter((albumId) => albumId !== id));
  };
</script>

<div class="list-container">
  {#if isLoading}
    <div>Loading albums...</div>
  {:else}
    {#each albums as album}
      <div class="list-item">
        <span class="title">{album.title}</span>
        <div class="buttons">
          {#if $panier.includes(album.id)}
            <button class="btn btn-sm btn-error" on:click={() => removeAlbum(album.id)}>Supprimer</button>
          {:else}
            <button class="btn btn-sm btn-success" on:click={() => addAlbum(album.id)}>Ajouter</button>
          {/if}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 193rem;
  }

  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .title {
    flex: 1;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }
</style>
