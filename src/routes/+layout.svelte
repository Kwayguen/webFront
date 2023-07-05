<script lang="ts">
    import "../global.css";
</script>

<div class="min-h-screen bg-base-300">
    <nav class="navbar bg-base-100 px-6">
        <div class="flex-1">
            <a href="/" class="font-bold text-xl" style="z-index:99999;">Home </a>
            <a href="/catPick" class="font-bold text-xl" style="z-index:99999;">Pic pick</a>
            <a href="/shop" class="font-bold text-xl" style="z-index:99999;">Shop</a>
            <a href="/form" class="font-bold text-xl" style="z-index:99999;">Formulaire</a>
            <a href="/settings" class="font-bold text-xl" style="z-index:99999;">Settings</a>
        </div>
    </nav>
    <slot />
</div>
<style type="text/css">

</style>