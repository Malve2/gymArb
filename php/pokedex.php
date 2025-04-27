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
            <h1 id="pageTitle">Pokédex!</h1>
            <section id="filters">
                <input id="searchBar" name="searchBar" type="text" placeholder="Search for Pokémon!">
            </section>

            <section id="pokemonCardContainer"></section>

        
            <section id="pagination">
                <a id="loadMore">
                    Load More Pokémon
                </a>
                <select name="pokemonPerLoad" id="pokemonPerLoad" value="20">
                    <option value="20" selected disabled>Pokemon Per Load</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="100">100</option>
                </select>
            </section>
            <a id="toTop"href="#">ò</a>
            
        </main>
    </div>
    
    <?php
    require_once("footer.php");
    ?>
    
</body>
</html>
