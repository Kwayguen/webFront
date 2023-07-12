# Rendu Web Avancé Front
### J'ai choisi pour ce module d'explorer la technologie sveltekit
Sveltekit 1.0 est sorti en décembre 2022, c'est donc très récent et à beaucoup de marge de développement dans un futur proche.
## Dans un premier temps j'ai simplement fait une navbar me permettant de naviguer entre plusieurs page de mon site
Donc j'ai vite découvert que contrairement a React.js le rootage est intégré dans SvelteKit, il suffit de créer sa page au bon endroit dans le fichier routes.
Pour naviguer il suffit d'une balise `<a href="/folderName"></a>`
Donc pour créer une page il faut un fichier +page.svelte dans son dossier, et il est possible de créer un fichier +layout.svelte qui sera transmis à tous ses dossiers enfant. C'est donc le bon endroit pour créer une navbar qui sera dispo dans toute l'app. Donc je créé mon +layout.svelte à la racine de mon app, j'importe mon css, je créé ma navbar et il ne faut pas oublier la balise `<slot />` qui indique ou ira le code de la page.
```html
<script lang="ts">
    import "../global.css";

</script>

<div class="bg-base-300 min-h-full">
    <div class="navbar bg-base-100 px-6">
        <div class="flex-1">
            <a href="/" class="font-bold text-xl">Home </a>
            <a href="/catPick" class="font-bold text-xl">Pic pick</a>
            <a href="/settings" class="font-bold text-xl">Settings</a>
        </div>
        
    </div>
    <slot />
</div>

<!-- J'ai appris plus tard que la bonne pratique est de définir ses routes et de les sécuriser -->
<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
	const navigation = [
		{ label: "Home", href: "/" },
		{ label: "Pricing", href: "/pricing" },
		{ label: "Contacts", href: "/contacts" },
		{ label: "Account", href: "/account" }
	];
	beforeNavigate((nav) => {

	});
</script>
```

### Exemple de routes sur React 
```tsx
// il faut importer router-dom !!
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="counter" element={<Counter />} />
        <Route path="timer" element={<Timer />} />
        <Route path="theme" element={<Theme />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

## J'ai ensuite fait un exemple d'appel API
Le principe est simple, avec un bouton j'appelle une API qui me fournit une liste de 10 images, et je permets avec un bouton par image de les afficher.
Je créé donc le répertoire de la route de ma page pour le call API, la page ressemble à ça:
```html
<body>
  <main>
    <h1>Pick Cats Pics Page</h1>
    <section>
      <PicPicker />
    </section>
  </main>
</body>
```
Donc simplement un titre puis j'appelle le composant 'PicPicker'
```typescript
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
```
Donc je commence par l'appel API avec un fetch puis je map le résultat dans une liste.
```html
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
```
Ensuite j'affiche un bouton par élément de la liste, chaque bouton affiche une image dans le component placeholder => ```<Picture />``` qui est un component qui gère l'affichage d'une image.
C'est tout pour le call API.
<br>
## Variables d'état
Dans react.js, pour utiliser une variable on doit passer par la fonction useState, pour accèder à l'état de la variable.<br>
Pour la modifier il faut passer par une fonction qui va aller modifier l'état de la variable.
```typescript 
const [count, setCount] = useState(0);
setCount(count + 1);
```
SvelteKit priorise la réactivité et une simple déclaration de variable permet de pouvoir la modifier en code et l'affichage sera directement mis à jour.
```typescript
let variable = true;
variable = false;
```
Cette différence s'explique par le fait que react.js utilise une approche de rendu virtuel (Virtual DOM), où les modifications de l'interface utilisateur sont d'abord appliquées à une représentation virtuelle de l'arbre DOM, puis diffusées vers le navigateur; SvelteKit lui adopte une approche de rendu compilé en ligne, où le code source est transformé en JavaScript optimisé et directement exécuté dans le navigateur.

## Variables globales
Pour créer une variable accessibles depuis n'importe quelle page de notre app en svelte il faut utiliser des stores. Ce sont des objets avec une méthode "subscribe" qui prévient les fichiers intéressés du changement de valeur de la variable.<br>
Pour l'exemple je vais faire un compteur modifiable dans la page settings et qui s'affiche à jour dans ma page d'accueil.<br>
Je créé dans src un dossier store, qui contiendra ma variable ainsi que les foncions qui la modifieront. Je créé ensuite mon fichier store.js:
```js
import { writable } from 'svelte/store';

export const count = writable(0);
```
Au même endroit je créé un component Incrementer.svelte dans le dossier store. Il va simplement incrémenter la variable globale de 1 par click sur le bouton.
```html
<script>
	import { count } from './store.js';

	function increment() {
		count.update((n) => n + 1);
	}
</script>

<button class="btn" on:click={increment}> + </button>
```
Decrementer :
```html
<script>
	import { count } from './store.js';

	function decrement() {
		count.update((n) => n - 1);
	}
</script>

<button class="btn" on:click={decrement}> - </button>
```
Resetter :
```html
<script>
	import { count } from './store.js';

	function reset() {
		count.set(0);
	}
</script>

<button class="btn" on:click={reset}> reset </button>
```
Et il faut intégrer la variable dans le fichier app.html :
```html
<!DOCTYPE html>
<script type="text/javascript">

	let countValue;
	count.subscribe((value) => {
		countValue = value;
	});
</script>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```
Ensuite pour l'afficher il faut importer le store, récupérer la valeur de la variable dans une page svelte et elle est utilisable dans cette page :
```html
<script lang="ts">
  import { count } from '../store/store.js';

  let countValue: any;
  count.subscribe((value) => {
    countValue = value;
  });

</script>
<body>
  <main>
    <h1 class="font-bold text-xxl">Welcome to My Website</h1>
    <h1>The count is {countValue}</h1>
  </main>
</body>
```
## Maintenant je vais faire un "shop"
### Je vais récupérer une liste depuis une API, créer un panier pour y ajouter les objets de la liste dedans, et ajouter un effet lorsque le panier est plein

Je commence par créer un dossier component dans src pour créer mon shop dedans.<br>
Une interface pour définir mes objets, et le call API pour les récupérer
```ts
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
  // En créant le component, la liste d'objets est appelée depuis un API de fausses data
  onMount(() => fetchData());
  ```
  ## Equivalent en react :
  ```ts
  interface Album {
  id: number;
  title: string;
}

const Products = () => {

  const albums = useQuery({
    queryKey: ["albums"],
    queryFn: async (): Promise<Album[]> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const data = (await response.json()) as Album[];

      console.log(data);

      return data;
    },
  });
```
Ensuite j'affiche la liste d'objet
```html
</script>
<!-- J'ajoute simplement après mon script mon code html -->
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
```
## Equivalent en react :
```ts
return (
    <div style={{ marginTop: "4rem" }}>
      {albums.data?.map((album) => (
        <div key={album.id}>
          {album.title}

          {panier.indexOf(album.id) !== -1 && <button>Supprimer</button>}
          {panier.indexOf(album.id) === -1 && (
            <button onClick={() => addAlbum(album.id)}>Ajouter</button>
          )}
        </div>
      ))}
    </div>
  );
```
Pour finir j'ajoute la possibilité d'ajouter un objet au panier, et je fixe une limite à ce panier
Dans un premier temps je créer mon panier de manière globale dans mon store
```ts
import { writable } from 'svelte/store';

export const panier = writable(initialPanier);
```
Ensuite je l'importe dans mon component shop
```ts
import { panier } from '../store/store.js';
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
```
## Equivalent en react (sans la variable globale) :
```ts
  useEffect(() => {
    if (panier.length > 5) {
      alert("Attention, votre panier est trop gros");
    }
  }, [panier]);

  const addAlbum = (id: number) => {
    setPanier((p) => [...p, id]);
  };

  if (albums.isLoading) {
    return <div>Loading albums...</div>;
  }
```

# Ce que j'ai compris des différences entre Svelte et React pour la gestion du DOM

React créé une couche supplémentaire entre l'app et le DOM. React à sa propre représentation du DOM, lorsque qu'il est demandé de chargé les modifications, react est capable de déterminer les différences entre sa détermination du DOM et le DOM réél pour déterminer le nombre minimal de modifications à faire. React valide ensuite la manipulation.

Svelte quand à lui ne créé pas sa propre représentation du DOM. Il arrive à directement déterminé quels sont les changements qui vont êtres apportés au DOM et écrit directement les méthodes pour modifier les DOM. Par exemple : createElement, setAttribute.
<br>
Svelte n'a pas besoin de chercher les différences entre deux moments, chaque mises à jour du DOM et découpé en micro tâches.
<br>
Ce fonctionnement permet d'éviter un défaut que beaucoup de gens font en React, des components très lourds peuvent être appelés à être recharger à chaque modifications du DOM inutilement. Alors que dans Svelte ils ne sont plus considéré comme composants mais fait directement partie de la page.

### The End

