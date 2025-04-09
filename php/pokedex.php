<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex</title>
    
    <link rel="stylesheet" href="../styles/pokedexStyle.css">
    <script src="../scripts/pokedex.js" defer></script>
</head>

<body id = "body">
    <?php
    require_once("header.php");
    ?>
    <div class="wrapper">
        <main>
            <section id="filters">
                <input id="searchBar" name="searchBar" type="text" placeholder="Search for Pokémon!">
            </section>

            <section id="pokemonCardContainer"></section>
            <!-- <button id="nextButton">Next</button> -->
            <section id="pagination">
                <a id="loadMore">
                    Load more pokémon
                </a>
                <select name="pokemonPerLoad" id="pokemonPerLoad" value="20">
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="100">100</option>
                </select>
            </section>
        </main>
    </div>
    
    <?php
    require_once("footer.php");
    ?>
    
</body>
</html>
