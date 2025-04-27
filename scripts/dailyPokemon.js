fetchPokemonData("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304");

async function fetchPokemonData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const rng = mulberry32(seed);

    // Shuffle Pokémon list deterministically
    const shuffled = [...data.results].sort(() => rng() - 0.5);

    // Pick first N Pokémon (e.g., 6)
    const selected = shuffled.slice(0, 6);

    // Fetch individual details
    const pokemonPromises = selected.map(async (pokemon) => {
      const pokemonData = await fetch(pokemon.url);
      return await pokemonData.json();
    });

    const allPokemonDetails = await Promise.all(pokemonPromises);

    renderPokemonCards(allPokemonDetails);
  } catch (error) {
    console.error(error);
  }
}

// --- Simple deterministic PRNG ---
function mulberry32(seed) {
  return function() {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}


function createCard(pokemonDetails)
{
  
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
    card.classList.add("pokemon");
    types.forEach(type =>
    {
      card.classList.add(type);
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
    return card;
}

function renderPokemonCards(allPokemonDetails) {
  const carousel = document.getElementById('dailyPokemon');
  // Add all real cards
  allPokemonDetails.forEach(pokemon => {
    carousel.appendChild(createCard(pokemon));
  });

  // Scroll to first real card

}


// document.querySelectorAll(".arrow").forEach(arrow => {
//   arrow.addEventListener("click", () => {
//     const dir = arrow.classList.contains("left") ? -1 : 1;
//     scrollCarousel(dir);
//   });
// });

// const carousel = document.getElementById('dailyPokemon');

// carousel.addEventListener('wheel', (e) => {
//   e.preventDefault();
//   const direction = e.deltaY > 0 ? 1 : -1;
//   scrollCarousel(direction);
// }, { passive: false });

// function scrollCarousel(direction) {
//   const carousel = document.getElementById('dailyPokemon');
//   const cards = carousel.querySelectorAll('.pokemon');
//   const cardWidth = cards[0]?.offsetWidth || 200;
//   const gap = 16;
//   const scrollAmount = (cardWidth + gap) * direction;

//   const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

//   const isAtEnd = carousel.scrollLeft + scrollAmount > maxScrollLeft + (scrollAmount / 2);
//   const isAtStart = carousel.scrollLeft + scrollAmount < (scrollAmount / 2);

//   if (isAtEnd && direction === 1) {
//     // Loop to start
//     carousel.scrollTo({ left: 0, behavior: 'smooth' });
//   } else if (isAtStart && direction === -1) {
//     // Loop to end
//     carousel.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
//   } else {
//     carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   }
// }



function capitalizeFirstLetter(val) {
    //tar tecknet på plats 0 och gör det stort, sedan lägger man till det tecknet på 
    //resten av strängen som inte längre har första tecknet, sedan returnerar den färdiga strängen
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }