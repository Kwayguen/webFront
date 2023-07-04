<script>
    import Shop from "../../components/shop.svelte";
    import { countPanier } from "../../store/store.js";
  </script>
  
  <main>
    <Shop />
  
    <div class="panier-counter">
      <span>Panier: {countPanier}</span>
    </div>
  </main>
  
  <style>
    .panier-counter {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background-color: #f2f2f2;
      padding: 0.5rem;
      border-radius: 5px;
    }
  </style>