<script lang="ts">

import Picture from "./pic.svelte";

export let src = "";
export let alt = "";

let picList:{src: string, alt: string}[] = [];
const randomPics = async () => {
  let res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
  let randPic = await res.json();
  picList = randPic.map((p:any) => {
    return {src: p.url, alt: p.id}
  });
}

const selectPic = (newSrc: string, newAlt: string) => {
    src = newSrc;
    alt = newAlt;
};

</script>

<div class="head">
<h2>Image picker </h2>
<button class="button" on:click={randomPics}>Get Pics</button>
</div>
<div class="buttons">
    {#each picList as { src, alt}}
        <button on:click={() => selectPic(src, alt)} >{alt}</button>
    {/each}
</div>

<Picture {src} {alt} />

<style>
  .head{
    display: flex;
    gap: 1em;
  }

    h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  button {
    background-color: #eee;
    color: #333;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #007bff;
    color: #fff;
  }
</style>







