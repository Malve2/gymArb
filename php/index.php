<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokétek</title>
    <script src="../scripts/dailyPokemon.js" defer></script>
    <link rel="stylesheet" href="../styles/index.css">
    <link rel="stylesheet" href="../styles/pokedexStyle.css">
</head>
<body>

<?php
require_once("header.php");
?>

<div class="wrapper">
<main>
    <h1 id="pageTitle">
        Home
    </h1>
    <h2>Today's Pokémon!</h2>
    <section id="dailyPokemonContainer">
        
            <div class="arrow left">
                <div class="line"></div>
                <div class="line"></div>
            </div>
        
        <div id="dailyPokemon">

        </div>
  
            <div class="arrow right">
                <div class="line"></div>
                <div class="line"></div>
            </div>
    </section>
    
</main>
</div>

    <!-- <img src="../images/every-pokemon.jpg" alt="A lot of different pokémon."> -->

<?php
require_once("footer.php");
?>
    
</body>
</html>