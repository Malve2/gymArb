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

        <section id="welcomeSection">
        <div><h2>Pokémon!</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum corporis sed veniam earum, soluta voluptas, eius veritatis corrupti odio molestias perspiciatis. Fugit explicabo assumenda quo dolor maiores perferendis impedit vel.</p></div>

            <div>
                <h2>Explore Pokédex!</h2>
                <img src="../images/every-pokemon.jpg" alt="">
                <a href="pokedex.php">Click Here!</a>
            </div>
        </section>

    
        <section id="dailyPokemonContainer">
        <h2>Today's Pokémon!</h2>
            <div id="dailyPokemon">
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