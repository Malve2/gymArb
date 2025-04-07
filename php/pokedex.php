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
                <div id="previous">
                    <a href="#">
                        Previous Pokémon
                    </a>
                </div>
                <div id="next">
                    <a href="#">
                        Next Pokémon
                    </a>
                </div>
            </section>
        </main>
    </div>
    
    <?php
    require_once("footer.php");
    ?>
    
</body>
</html>
