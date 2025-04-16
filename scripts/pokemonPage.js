const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

apiUrl = "https://pokeapi.co/api/v2/pokemon/";

for(let i = -1; i < 2; i++)
{
    if(i == 0)
    {
        continue;
    }
    console.log(apiUrl + (Number(id) + i))
    fetchPokemonData(apiUrl + (Number(id) + i));
}

fetch(apiUrl + id,{
    
    method:'GET',
    headers:{
        'Content-Type' : 'application/json'
    },

})

.then(response => response.json())
.then(data => renderPokemon(data))
.catch(error => console.log("FEDL VID SJICKNING", error));

function renderPokemon(pokemon)
{
  let name = capitalizeFirstLetter(pokemon.name);
  if(pokemon.name.toLowerCase().includes("-m"))
  {
    name = capitalizeFirstLetter(pokemon.name).replace("-m", "-male");
  }
  else if(pokemon.name.toLowerCase().includes("-f"))
  {
    name = capitalizeFirstLetter(pokemon.name).replace("-f", "-female");
  }
    
    const id = pokemon.id;
    const profileImage = document.getElementById("profile");
    profileImage.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    profileImage.alt = "Picture of the pokémon " + name;
    document.title = name + "!";
    document.getElementById("pageIcon").href = pokemon["sprites"]["other"]["dream_world"]["front_default"];
    document.getElementById("pageTitle").innerHTML = name + "!";
    document.getElementById("cry").src = pokemon["cries"]["latest"];




    //Stoppa in länkar till föregående och nästa pokemon, samt deras namn
    
    
}

function capitalizeFirstLetter(val) 
{
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


async function fetchPokemonData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();
      

      let previousPokemonLink = document.querySelector("div#previous a");
      previousPokemonLink.href = `pokemon.php?id=${Number(id)-1}`;

      let nextPokemonLink = document.querySelector("div#next a");
      nextPokemonLink.href = `pokemon.php?id=${Number(id)+1}`;

      let previousPokemonImage = document.querySelector("div#previous img");
      let nextPokemonImage = document.querySelector("div#next img");

      let name = capitalizeFirstLetter(data.name);
      if(name.includes("-m"))
      {
        name = name.replace("-m", "-male");
      }
      else if(name.includes("-f"))
      {
        name = name.replace("-f", "-female");
      }
      if(id === 1)
      {
          previousPokemonLink.remove();        
      }
      
      if(data.id < Number(id))
      {
        previousPokemonImage.src = data["sprites"]["other"]["dream_world"]["front_default"];
        previousPokemonLink.innerHTML += name;
      }
      else
      {
        nextPokemonImage.src = data["sprites"]["other"]["dream_world"]["front_default"];
        nextPokemonLink.innerHTML += name;
      }
      


  
    }
    catch (error) {
      console.error(error);
    }
  }



































































// fetchKantoPokemon();

//   async function fetchKantoPokemon() {
//       try {
//         let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
//         console.log(apiUrl);
//           const response = await fetch(apiUrl); // Limit to Kanto Pokémon (151 Pokémon)

//           if (!response.ok) {
//               throw new Error("Could not fetch resource");
//           }

//           const data = await response.json();
//           console.log(data);

//           // Fetch individual Pokémon details for each result
//           const pokemonPromises = data.results.map(async (pokemon) => {
//               const pokemonData = await fetch(pokemon.url); // Fetch individual Pokémon details
//               const pokemonDetails = await pokemonData.json();

//               return pokemonDetails; // Return the Pokémon details including id and sprite
//           });

//           // Wait for all Pokémon data to be fetched
//           const allPokemonDetails = await Promise.all(pokemonPromises);

//           // Sort the Pokémon details by their id (number)
//           allPokemonDetails.sort((a, b) => a.id - b.id);

//           // Loop through the sorted Pokémon data and display the images
//           allPokemonDetails.forEach((pokemonDetails) => {
//               const pokemonName = pokemonDetails.name;
//               const pokemonImage = pokemonDetails.sprites.other["official-artwork"].front_default;
//               const pokemonIndex = pokemonDetails.id; 

//               // Create an image element
//               const img = document.createElement('img');
//               const name = document.createElement('h2');
//               name.innerText = pokemonName;

//               const id = document.createElement('h3');
//               //id.innerText = ID: ${pokemonIndex};

//               const div = document.createElement('a');
//               div.href = "pokemonPage.php?id=" + pokemonIndex;
//               div.className = "pokemon";
//             img.src = pokemonImage; // Set the sprite URL as the image source
//               img.alt = pokemonName;  // Set the Pokémon name as alt text
//               img.id = pokemonIndex;  // Set the ID to the Pokémon's ID (optional)

//               // Set the background color of the image itself
//               img.style.backgroundColor = backgroundColor;  // Set the background color of the image

//               document.getElementById("body").appendChild(div);
//               div.appendChild(id); 
//               div.appendChild(img);
//               div.appendChild(name);
//           });

//       } catch (error) {
//           console.log(error);
//       }
//   }
