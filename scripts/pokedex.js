// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const page = Number(urlParams.get('page'));

let page = 1;
let pokemonPerLoad = document.getElementById("pokemonPerLoad");

const MAX_POKEMON = 1304;
const POKEMON_PER_REQUEST = 20;
let apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";

fetchPokemonData(apiUrl);

// Hämta alla Pokémon (200 stycken)
async function fetchAllPokemon() 
{
  let allPokemon = [];
  for (let i = 0; i < MAX_POKEMON / POKEMON_PER_REQUEST; i++) {
    const offset = i * POKEMON_PER_REQUEST;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMON_PER_REQUEST}`;
    const response = await fetchPokemonData(apiUrl);
    const data = await response.json();
  
    allPokemon = allPokemon.concat(data.results); // Lägg till resultatet i alla Pokémon
  }
}






async function fetchPokemonData(apiUrl) {
  try {
    //let apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    
    // Fetch individual Pokémon details for each result
    //console.log(data);
    const pokemonPromises = data.results.map(async (pokemon) => {

      const pokemonData = await fetch(pokemon.url); // Fetch individual Pokémon details
      const pokemonDetails = await pokemonData.json();
      
      return pokemonDetails; // Return the Pokémon details including id and sprite
    });

    // Wait for all Pokémon data to be fetched
    const allPokemonDetails = await Promise.all(pokemonPromises);
    
    // Sort the Pokémon details by their id (number)
    allPokemonDetails.sort((a, b) => a.id - b.id);
    //console.log(allPokemonDetails);

    renderPokemonCards(allPokemonDetails);

  }
  catch (error) {
    console.error(error);
  }
}

// let allPokemonDetails = await fetchPokemonData();
// console.log(allPokemonDetails);

function renderPokemonCards(allPokemonDetails) {
  let body = document.getElementById("pokemonCardContainer");
  body.innerHTML = "";

  //loopar igenom alla resultat som finns i allPokemonDetails som pokemonDetails
  //detta för att skapa olika element för varje pokemon som kommer vara utformade på samma sätt
  allPokemonDetails.forEach(pokemonDetails => {
    const card = document.createElement("article");
    let pokemonName = pokemonDetails.name;
    const entryNumber = pokemonDetails.id;

    if(pokemonName.includes("-m"))
      {
        pokemonName = pokemonName.replace("-m", "-male");
      }
      else if(pokemonName.includes("-f"))
      {
        pokemonName = pokemonName.replace("-f", "-female");
      }


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
    card.className = "pokemon ";
    types.forEach(type =>
    {
      card.className += type + " ";
    })

    const nameHeader = document.createElement("h2");
    nameHeader.innerHTML = capitalizeFirstLetter(pokemonName);

    //skapar p element (text)
    const entryText = document.createElement("p");
    entryText.innerHTML = entryNumber;

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
  hidePokemons(page, pokemonPerLoad.value);
}

function hidePokemons(page, pokemonPerLoad)
{
  let pokemons = document.getElementsByClassName("pokemon");
  
  Array.from(pokemons).forEach((pokemon, index) =>{
    if(index > pokemonPerLoad * page - 1)
    {
      pokemon.style.display = "none";
    }
    else
    {
      pokemon.style.display = "flex";
    }
    
  })
  console.log(pokemonPerLoad);
    console.log(page);
}



// Gör paginationen bra!!! /////////////////////////////////////////////////////////
 
let loadMoreButton = document.querySelector("a#loadMore");
loadMoreButton.addEventListener("click", function(
){
  page = page + 1;

  hidePokemons(page, pokemonPerLoad.value);
});






function capitalizeFirstLetter(val) {
  //tar tecknet på plats 0 och gör det stort, sedan lägger man till det tecknet på 
  //resten av strängen som inte längre har första tecknet, sedan returnerar den färdiga strängen
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


let toTop = document.getElementById("toTop");
window.onscroll = function() {toTopButtonVisability()};
toTopButtonVisability = () => {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    toTop.style.display = 'block';
  } else {
    toTop.style.display = 'none';
  }
}




const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function(){
  let pokemons = document.querySelectorAll(".pokemon");
  console.log(searchBar.value);
  pokemons.forEach(pokemon =>{

    let pokemonClass = pokemon.classList.value;
    pokemonClass = pokemonClass.replace("pokemon " , "");
    let pokemonId = pokemon.id;
    if(!pokemonClass.includes(searchBar.value.toLowerCase()) && !pokemonId.includes(searchBar.value.toLowerCase()))
    {
      pokemon.style = "display:none;";
    }
    else
    {
      pokemon.style = "display: flex;"
    }
    if(searchBar.value === "")
    {
      pokemon.style = "display:flex;"
    }
  })
});


//const nextButton = document.getElementById("nextButton");
// nextButton.addEventListener("click", renderNext);
// let timesNextButtonClicked = 0;
// function renderNext()
// {
//   timesNextButtonClicked += 1;
//   fetchPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=${MAX_POKEMON * timesNextButtonClicked}&Limit=${MAX_POKEMON}`);
//   scroll(0,0);
// }






// const searchBar = document.getElementById("searchBar");
// searchBar.addEventListener("input", filterPokemons);

// function filterPokemons(amount)
// {
//   console.log(searchBar.value);
//   fetchPokemonData("https://pokeapi.co/api/v2/pokemon?Limit=" + searchBar.value);
// }