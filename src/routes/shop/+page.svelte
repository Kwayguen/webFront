<script>

    import Shop from "../../components/shop.svelte";
    import { panier } from "../../store/store";

</script>
  
<body>
    <main>
        <Shop />
        <div class="panier-counter chat chat-start">
            <span class="chat-bubble">Panier : { $panier.length }</span>
        </div>
    </main>
</body>

<style>
  .panier-counter {
    position: absolute;
    display: flex;
    margin-left: 80vw;
    margin-top: -80vh;
    max-height: 20vh;
    min-width: 20vw;
    max-width: 30vw;
    padding: 0.5rem;
    border-radius: 5px;
  }
</style>