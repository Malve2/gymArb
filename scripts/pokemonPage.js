const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

apiUrl = "https://pokeapi.co/api/v2/pokemon/";

for (let i = -1; i < 2; i++) {
  if (i == 0) {
    continue;
  }
  if (Number(id) + i == 0) {
    continue;
  }
  paginationLinks(apiUrl + (Number(id) + i));
}

fetch(apiUrl + id, {

  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },

})

.then(response => response.json())
.then(data => renderPokemon(data))
.catch(error => console.log("FEDL VID SJICKNING", error));

async function renderPokemon(pokemon) {
  let name = capitalizeFirstLetter(pokemon.name);
  if (pokemon.name.toLowerCase().includes("-m")) {
    name = capitalizeFirstLetter(pokemon.name).replace("-m", "-male");
  }
  else if (pokemon.name.toLowerCase().includes("-f")) {
    name = capitalizeFirstLetter(pokemon.name).replace("-f", "-female");
  }

  const id = pokemon.id;
  const profileImage = document.getElementById("profile");
  profileImage.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
  profileImage.alt = "Picture of the pokémon " + name;
  document.title = name + "!";


  document.getElementById("pageIcon").href = pokemon["sprites"]["other"]["dream_world"]["front_default"] || pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default || "../images/Poké_Ball_icon.svg";
  document.getElementById("pageTitle").innerHTML = document.getElementById("pageTitle").innerHTML.replace("Pokémon", name);
  document.querySelector("h1#pageTitle span").innerHTML = "#" + pokemon.id;
  //document.getElementById("cry").src = pokemon["cries"]["latest"];

  const weaknessesSet = new Set();

  const types = pokemon.types.map(type => type.type.name);

  for (let type of types)
  {
    //fetchType(type.type.url, type.slot);
    
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();
    const weaknesses = typeData.damage_relations.double_damage_from.map(item => item.name);
    
    weaknesses.forEach(weakness => weaknessesSet.add(weakness));

  }
  console.log(weaknessesSet);

  displayWeaknesses(weaknessesSet);


  fetchSpeciesData(pokemon.species.url);
}

async function fetchType(typeUrl, slot)
{
  try {
    const response = await fetch(typeUrl);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const type = await response.json();

    let body;

    if(slot = 1)
    {
      body = document.getElementById("mainType");
    }
    else if (slot = 2)
    {
      body = document.getElementById("secondaryType");
    }
    else
    {
      body = document.createElement("div");
      document.getElementById("types").appendChild(body);
    }

    let image = document.createElement("img");
    image.src = type.sprites["generation-vii"]["sun-moon"]["name_icon"];
    body.appendChild(image);


  }
  catch (error) {
    console.error(error);
  }
}


function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


async function paginationLinks(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();


    let previousPokemonLink = document.querySelector("div#previous a");
    previousPokemonLink.href = `pokemon.php?id=${Number(id) - 1}`;

    let nextPokemonLink = document.querySelector("div#next a");
    nextPokemonLink.href = `pokemon.php?id=${Number(id) + 1}`;

    let previousPokemonImage = document.querySelector("div#previous img");
    let nextPokemonImage = document.querySelector("div#next img");

    let name = capitalizeFirstLetter(data.name);
    if (name.includes("-m")) {
      name = name.replace("-m", "-male");
    }
    else if (name.includes("-f")) {
      name = name.replace("-f", "-female");
    }

    if (Number(id) === 1) {
      previousPokemonLink.remove();
    }

    if (data.id < Number(id)) {
      previousPokemonImage.src = data["sprites"]["other"]["dream_world"]["front_default"] || data["sprites"]["front_default"] || "../images/imageMissing.png";
      previousPokemonLink.innerHTML += "Prev: " + name;
    }
    else {
      nextPokemonImage.src = data["sprites"]["other"]["dream_world"]["front_default"] || data["sprites"]["front_default"] || "../images/imageMissing.png";
      nextPokemonLink.innerHTML += "Next: " + name;
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function fetchSpeciesData(speciesUrl) {
  try {
    const response = await fetch(speciesUrl);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    console.log(data);
    fetchEvolutionChain(data.evolution_chain.url);
  }
  catch (error) {
    console.error(error);
  }
}


async function fetchEvolutionChain(evolutionUrl) {
  try {
    const response = await fetch(evolutionUrl);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    console.log(data);
    if (data.chain.species?.name) {
      fetchEvolutionChainData(data.chain.species.url.replace("pokemon-species", "pokemon"), 1);
    }

    if (data.chain.evolves_to) {
      await data.chain.evolves_to.forEach(element => {
        fetchEvolutionChainData(element.species.url.replace("pokemon-species", "pokemon"), 2);
        if (element.evolves_to) {
          element.evolves_to.forEach(el => {
            fetchEvolutionChainData(el.species.url.replace("pokemon-species", "pokemon"), 3);

          })
        }
      });

    }

  }
  catch (error) {
    console.error(error);
  }
}


async function fetchEvolutionChainData(pokemon, evolutionLevel) {
  try { 
    const response = await fetch(pokemon);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();

    
    renderEvolutionData(data, evolutionLevel);
  }
  catch (error) {
    console.error(error);
  }
}


function renderEvolutionData(data, evolutionLevel) {
  let body = document.getElementById("evolutions");
  let div;
  if(evolutionLevel == 1)
  {
    div = document.getElementById("firstEvolution");
    
  }
  else if(evolutionLevel == 2)
  {
    document.querySelector(".arrow:nth-child(2)").classList.remove("hidden");
    document.getElementById("secondEvolution").classList.remove("hidden"); 
    div = document.getElementById("secondEvolution");
  }
  else if(evolutionLevel == 3)
  {
    document.getElementById("thirdEvolution").classList.remove("hidden");
    document.querySelector(".arrow:nth-child(4)").classList.remove("hidden");
    div = document.getElementById("thirdEvolution")
  }
  else
  {
    div = document.createElement("div");
    body.appendChild(div);
  }
  let link = document.createElement("a");
  link.href = "pokemon.php?id=" + data.id;
  let image = document.createElement("img");
  image.src = data.sprites["front_default"];
  link.appendChild(image);
  div.appendChild(link);
  //console.log((Object.allKeys(data.chain.evolves_to[0])));

}


function displayWeaknesses(weaknesses) {
  const weaknessesContainer = document.getElementById('weaknesses');
  weaknessesContainer.innerHTML = ''; // Clear existing weaknesses

  if (weaknesses.length > 0) {
    const title = document.createElement('h3');
    title.textContent = 'Weaknesses';
    weaknessesContainer.appendChild(title);

    weaknesses.forEach(weakness => {
      const weaknessElement = document.createElement('p');
      weaknessElement.textContent = capitalizeFirstLetter(weakness);
      weaknessesContainer.appendChild(weaknessElement);
    });
  } else {
    const noWeaknesses = document.createElement('p');
    noWeaknesses.textContent = 'No specific weaknesses found.';
    weaknessesContainer.appendChild(noWeaknesses);
  }
}