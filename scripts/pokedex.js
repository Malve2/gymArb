let pokemonPerLoad = document.getElementById("pokemonPerLoad");
let filteredPokemons = []; 
let visiblePokemon = 0;


let apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";

fetchPokemonData(apiUrl);

async function fetchPokemonData(apiUrl) {
  try {

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    
    // Fetch individual Pokémon details for each result
    const pokemonPromises = data.results.map(async (pokemon) => {

      const pokemonData = await fetch(pokemon.url); // Fetch individual Pokémon details
      const pokemonDetails = await pokemonData.json();
      
      return pokemonDetails;
    });

    // Wait for all Pokémon data to be fetched
    const allPokemonDetails = await Promise.all(pokemonPromises);
    
    // Sort the Pokémon details by their id (number)
    allPokemonDetails.sort((a, b) => a.id - b.id);

    renderPokemonCards(allPokemonDetails);

  }
  catch (error) {
    console.error(error);
  }
}

function renderPokemonCards(allPokemonDetails) {
  let body = document.getElementById("pokemonCardContainer");
  body.innerHTML = "";

  //loopar igenom alla resultat som finns i allPokemonDetails som pokemonDetails
  //detta för att skapa olika element för varje pokemon som kommer vara utformade på samma sätt
  allPokemonDetails.forEach(pokemonDetails => {
    const card = document.createElement("article");
    let pokemonName = pokemonDetails.name;
    const entryNumber = pokemonDetails.id;

    let types = new Array();
    pokemonDetails.types.forEach((typeList, index) =>
    {
      types[index] = [typeList.type.name];
    })
    
  
    //definerar bilderna utifrån vad som finns i api-anropet
    const image = pokemonDetails.sprites["front_default"];
    const officialImage = pokemonDetails.sprites.other["official-artwork"]["front_default"];

    //ger pokemon artikeln elementet id och klasser från apiet
    card.id = entryNumber + " " + pokemonName;
    card.classList.add("pokemon");
    card.classList.add("hidden");
    types.forEach(type =>
    {
      card.classList.add(type);
    })

    const nameHeader = document.createElement("h2");
    nameHeader.innerHTML = capitalizeFirstLetter(pokemonName);

    //skapar p element (text)
    const entryText = document.createElement("p");
    entryText.innerHTML = `#${entryNumber}`;

    const cardHeader = document.createElement("header");
    cardHeader.appendChild(nameHeader)
    cardHeader.appendChild(entryText);

    //skapar a element (en länk)
    const link = document.createElement("a");
    link.href = "pokemon.php?id=" + entryNumber;

    //skapar img element
    const img = document.createElement("img");
    //bilderna laddas inte in ordentligt när de inte syns på skärmen
    img.loading = "lazy";
    //om "image" inte finns tar den "officialImage" annars bilden "imageMissing" som säger att bild saknas
    img.src = image || officialImage || "../images/imageMissing.png";

    //stoppar in alla nyskapade element i dokumentet:
    link.appendChild(cardHeader);
    link.appendChild(img);
    card.appendChild(link);
    body.appendChild(card);
  });
  filteredPokemons = Array.from(document.querySelectorAll(".pokemon"));
  showPaginatedPokemons(); // show initial set

}
 
let loadMoreButton = document.querySelector("a#loadMore");
loadMoreButton.addEventListener("click", function() {
    showPaginatedPokemons();
  });






function capitalizeFirstLetter(val) {
  //tar tecknet på plats 0 och gör det stort, sedan lägger man till det tecknet på 
  //resten av strängen som inte längre har första tecknet, sedan returnerar den färdiga strängen
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


const toTop = document.getElementById("toTop");
window.onscroll = function() {toTopButtonVisability()};
toTopButtonVisability = () => {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
}




const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function () {
  const searchValue = searchBar.value.toLowerCase();
  const allPokemons = Array.from(document.querySelectorAll(".pokemon"));
  visiblePokemon = 0;
  console.log(pokemonPerLoad);

  
  // Set filteredPokemons no matter what
  filteredPokemons = allPokemons.filter(pokemon => {
    const pokemonClass = pokemon.classList.value.replace("pokemon ", "");
    const pokemonId = pokemon.id.toLowerCase();

    return (
      searchValue === "" ||
      pokemonClass.includes(searchValue) ||
      pokemonId.includes(searchValue)
    );
  });

  allPokemons.forEach(p => p.classList.add("hidden")); // hide all

  showPaginatedPokemons(); // show filtered
});

function showPaginatedPokemons() 
{
  const endIndex = Number(pokemonPerLoad.value) + visiblePokemon;

  // Then reveal paginated slice
  filteredPokemons.slice(visiblePokemon, endIndex).forEach(pokemon => {
    pokemon.classList.remove("hidden");
    visiblePokemon++;
  });
  if(visiblePokemon == filteredPokemons.length)
    {
      document.getElementById("pagination").classList.add("hidden")
    }
    else if(visiblePokemon < filteredPokemons.length && document.getElementById("pagination").classList.contains("hidden"))
    {
      document.getElementById("pagination").classList.remove("hidden");
    }
}

