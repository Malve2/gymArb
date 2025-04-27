const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

apiUrl = "https://pokeapi.co/api/v2/pokemon/";

paginationLinks(apiUrl + (Number(id) - 1));
paginationLinks(apiUrl + (Number(id) + 1));

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
  const id = pokemon.id;
  const profileImage = document.getElementById("profile");
  profileImage.src = pokemon.sprites.other["official-artwork"].front_default;
  profileImage.alt = "Picture of the pokémon " + name;
  document.title = name + "!";


  document.getElementById("pageIcon").href = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default || "../images/Poké_Ball_icon.svg";
  document.getElementById("pageTitle").innerHTML = document.getElementById("pageTitle").innerHTML.replace("Pokémon", name);
  document.querySelector("h1#pageTitle span").innerHTML = "#" + pokemon.id;
  //document.getElementById("cry").src = pokemon["cries"]["latest"];
  let statContainer = document.querySelector("section#statSection ul");
  let totalStatValue = 0;
  pokemon.stats.forEach(stat =>
  {
    let item = document.createElement("li");
    let nameSpan = document.createElement("span");
    nameSpan.innerText = `${capitalizeFirstLetter(stat.stat.name)}:`;
    let statSpan = document.createElement("span");
    statSpan.innerText = stat.base_stat;
    //item.innerText = `${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}`;
    item.appendChild(nameSpan);
    item.appendChild(statSpan);
    statContainer.appendChild(item); 
    totalStatValue += stat.base_stat;
  })
  let totalStatValueItem = document.createElement("li");
  //totalStatValueItem.innerText = `Total: ${totalStatValue}`;
  let totalStatValueSpan = document.createElement("span");
  totalStatValueSpan.innerText = totalStatValue;
  let totalStatValueName = document.createElement("span");
  totalStatValueName.innerText = "Total:";
  totalStatValueItem.appendChild(totalStatValueName);
  totalStatValueItem.appendChild(totalStatValueSpan);
  statContainer.appendChild(totalStatValueItem);
  console.log(pokemon.stats);

  const weaknessesSet = new Set();
  const resistancesSet = new Set();

  const types = pokemon.types.map(type => type.type.name);

  let index = 1;
  for (let type of types)
  {
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();
    renderTypes(typeData, index);
    const weaknesses = typeData.damage_relations.double_damage_from.map(item => item.name);
    const resistances = typeData.damage_relations.half_damage_from.map(item => item.name);

    resistances.forEach(resists => resistancesSet.add(resists));
    weaknesses.forEach(weakness => weaknessesSet.add(weakness));

    resistancesSet.intersection(weaknessesSet).forEach(overlap =>
    {
      weaknessesSet.delete(overlap);
    }
    )
    
    index++;
  }
  console.log(resistancesSet);
  console.log(weaknessesSet);

  displayWeaknesses(weaknessesSet);


  fetchSpeciesData(pokemon.species.url);
}

function renderTypes(type ,slot)
{
  let body;
  console.log(slot);
  if(slot == 1)
  {
    body = document.getElementById("mainType");
  }
  else if (slot == 2)
  {
    let title = document.querySelector("section#typeSection section.types h2");
    title.innerText = "Types:";
    body = document.getElementById("secondaryType");
  }
  else
  {
   body = document.createElement("div");
   document.getElementById("types").appendChild(body);
  }

  let image = document.createElement("img");
  image.src = type.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"]["name_icon"];
  body.appendChild(image);
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


    let previousPokemonLink = document.querySelector("a.previousPokemon");
    previousPokemonLink.href = `pokemon.php?id=${Number(id) - 1}`;

    let nextPokemonLink = document.querySelector("a.nextPokemon");
    nextPokemonLink.href = `pokemon.php?id=${Number(id) + 1}`;

    let previousPokemonImage = document.querySelector("a.previousPokemon img");
    let nextPokemonImage = document.querySelector("a.nextPokemon img");

    let name = capitalizeFirstLetter(data.name);

    if (Number(id) === 1) {
      previousPokemonLink.remove();
    }

    let image = data["sprites"]["other"]["official-artwork"]["front_default"] || data["sprites"]["front_default"] || "../images/imageMissing.png";

    if (data.id < Number(id)) {
      previousPokemonImage.src = image;
      document.querySelector("a.previousPokemon h2").innerHTML = `#${data.id}`;
      document.querySelector("a.previousPokemon span").innerHTML = name;
    }
    else {
      nextPokemonImage.src = image;
      document.querySelector("a.nextPokemon h2").innerHTML = `#${data.id}`;
      document.querySelector("a.nextPokemon span").innerHTML = name;
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

    let flavorTextContainer = document.getElementById("flavorText");
    

    let flavorTextEntries = new Map();


    data.flavor_text_entries.forEach(entry=>
    {
      if(entry.language.name == "en")
      {
        let flavorText = entry.flavor_text;
        flavorText = flavorText.replaceAll("\n", " ");
        flavorText = flavorText.replaceAll("\u000c", " ");
        flavorTextEntries.set(entry.version.name, flavorText);
      }
    }
    )
    console.log(flavorTextEntries);
    let list = document.querySelector("select#flavorTextSelect");
    let header = document.createElement("li");
    document.querySelector("select#flavorTextSelect option").value = Array.from(flavorTextEntries.keys())[0];
    flavorTextEntries.forEach((entry, key) =>
    {
      let item = document.createElement("option");
      item.innerText = capitalizeFirstLetter(key);
      item.value = key;
      list.appendChild(item);
    })
    updateFlavorText(flavorTextEntries, list);
    list.addEventListener("change", () => updateFlavorText(flavorTextEntries, list));

    fetchEvolutionChain(data.evolution_chain.url);
  }
  catch (error) {
    console.error(error);
  }
}

function updateFlavorText(flavorTextEntries, list)
{
  let text = document.querySelector("section#flavorTextContainer p");
  text.innerText = flavorTextEntries.get(list.value);
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
  let name = document.createElement("h2");
  name.innerText = capitalizeFirstLetter(data.name);
  link.appendChild(name);
  let image = document.createElement("img");
  image.src = data.sprites["front_default"];
  link.appendChild(image);
  let id = document.createElement("h2");
  id.innerText = `#${data.id}`;
  link.appendChild(id);
  
  div.appendChild(link);
  //console.log((Object.allKeys(data.chain.evolves_to[0])));

}


async function displayWeaknesses(weaknesses) {
  const weaknessesContainer = document.getElementById('weaknesses');

  try{
    

    if (weaknesses.size > 0) {

      for(let weakness of weaknesses)
      {
        console.log(weakness);
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${weakness}`);
        const typeData = await typeResponse.json();
        const weaknessElement = document.createElement('img');
        weaknessElement.src = typeData.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"].name_icon;
        weaknessesContainer.appendChild(weaknessElement);
      }
    }
    else 
    {
      const noWeaknesses = document.createElement('h2');
      noWeaknesses.textContent = 'No specific weaknesses found.';
      weaknessesContainer.appendChild(noWeaknesses);
    }
  }
  catch(error) 
  {
    console.error(error);
  }

}