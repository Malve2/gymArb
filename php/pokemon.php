<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Discover Pokémon details, evolutions, and sounds!">
    <title>Pokémon!</title>
    <script src="../scripts/pokemonPage.js" defer></script>
    <link rel="stylesheet" href="../styles/pokemonStyle.css">
</head>

<body id="body">
    <?php
    require_once("header.php");
    ?>
    <div class="wrapper">
        <main>
            <h1 id="pageTitle">
                Pokémon
                <span></span>
            </h1>
            <section id="pagination">
                <div id="previous">
                    <a>
                        <img alt="Image of the previous pokémon">
                    </a>
                </div>
                <div id="next">
                    <a>
                        <img alt="Image of the next pokémon">
                    </a>
                </div>
            </section>
            <a  id="linkBack" href="pokedex.php">Go Back</a>
            <section class="info" id="details">
                <section id="profileSection">
                    <img id="profile" alt="">
                </section>
                <section>
                    <section id="types">
                        <h2>Types</h2>
                        <div id="mainType"></div>
                        <div id="secondaryType"></div>
                    </section>
                    <div id="weaknesses"></div>
                </section>
            </section>
            <h2>Evolutions</h2>
            <section class="info" id="evolutions">
                <div id="firstEvolution"></div>
                <div class="arrow hidden">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div id="secondEvolution" class="hidden"></div>
                <div class="arrow hidden">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div id="thirdEvolution" class="hidden"></div>
            </section>
            <section id="">
            </section>

        </main>
    </div>
    <?php
    require_once("footer.php");
    ?>
</body>
</html>