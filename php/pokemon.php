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
            <section>
                <h1 id="pageTitle">
                    Pokémon!
                </h1>
            </section>
            <section id="pagination">
                <div id="previous">
                    <a>
                        Previous pokémon: 
                        
                    </a>
                    <img src="" alt="Image of the previous pokémon">
                </div>
                <div id="next">
                    <a>
                        Next Pokémon: 
                        
                    </a>
                    <img src="" alt="Image of the next pokémon">
                </div>
            </section>
            <a  id="linkBack" href="pokedex.php">Go Back</a>
            <section id="details">
                <section>
                    <img id="profile" src="" alt="">
                </section>
                <section>
                    <audio id="cry" controls src="">
                        
                    </audio>
                </section>
            </section>
            <section id="evolutions">

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