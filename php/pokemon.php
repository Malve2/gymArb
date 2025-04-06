<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            <section id="pagination">
                <div id="previous">
                    <a>
                        Previous Pokémon
                    </a>
                </div>
                <div id="next">
                    <a>
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