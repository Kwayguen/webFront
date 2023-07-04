<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms';
  import { page } from '$app/stores';
  import { count } from '../../store/store.js';
	import Incrementer from '../../store/Incrementer.svelte';
	import Decrementer from '../../store/Decrementer.svelte';
	import Resetter from '../../store/Resetter.svelte';

  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const theme = action.searchParams.get('theme');

    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter'
  ];

  let countValue: any;
  count.subscribe((value) => {
    countValue = value;
  });

  $: if(countValue == 5) console.log('yes')

  let showThemeOptions: boolean = false;
  function toggleThemeOptions() {
    showThemeOptions = !showThemeOptions;
  }

</script>

<body>
  <main class="flex-none">
    <div class="container">
      <div class="left">
        <div class="theme-button">
          <button class="btn" on:click={toggleThemeOptions}> Set Theme 🎨 </button>
          <ul class={"theme-options " + (showThemeOptions ? "show-theme-options" : "")}>
            <form method="POST" use:enhance={submitUpdateTheme}>
              {#each themes as theme}
                <li>
                  <button formaction="/?/setTheme&theme={theme}&redirectTo={$page.url.pathname}">{theme}</button>
                </li>
              {/each}
            </form>
          </ul>
        </div>
      </div>
      <div class="right">
        <ul class="menu menu-horizontal px-1 z-50">
          <li></li>
          <li>
            <h1>The count is {countValue}</h1>
            <Incrementer />
            <div></div>
            <Decrementer />
            <div></div> 
            <Resetter />
          </li>
        </ul>
      </div>
    </div>
  </main>
</body>


<style type="text/css">
    .container {
    display: flex;
    align-items: center;
    height: 100vh;
  }

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .theme-button {
    position: relative;
  }

  .theme-options {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    max-height: 250px; /* Adjust the maximum height as needed */
    overflow-y: auto;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .show-theme-options {
    display: block;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
  }
</style>
