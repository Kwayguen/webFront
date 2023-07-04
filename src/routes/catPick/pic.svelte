
<script>
    export let src = "";
    export let alt = "";
</script>

<section>
    <h2>{alt}</h2>
    <div class="images">
        <img src={src} alt={alt}>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
    }
    .images {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    img {
        max-width: 250px;
    }
</style>



