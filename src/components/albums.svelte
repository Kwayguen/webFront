<script lang="ts">
    import { onMount, onDestroy, afterUpdate } from 'svelte';
  

  /**
   * 2 eme etape : passer le panier en global comme l'api context de react
  */

    let playlist = [];
  
  $: if(playlist.length > 5) console.log("panier trop gros")

    // hook panier

    // Méthodes du cycle de vie
    onMount(() => {
        // appel API vers albums jsonplaceholder
        // rempli liste
        console.log('Le composant est créé');
    });
  
    afterUpdate(() => {
      console.log('Le composant est mis à jour');
    });
  
    onDestroy(() => {
      console.log('Le composant est détruit');
    });

    function handleClick() {
    }
</script>
  
<!-- créé la liste et l'afficher -->
<button class="btn btn-primary" on:click={handleClick}>

</button>

  
  
  
  
  
  