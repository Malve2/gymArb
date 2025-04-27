<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Discover Pokémon details, evolutions, and sounds!">
    <title>Pokémon!</title>
    <script src="../scripts/dropDown.js" defer></script>
    <script src="../scripts/pokemonPage.js" defer></script>
    <link rel="stylesheet" href="../styles/pokemonStyle.css">
</head>

<body id="body">
    <?php
    require_once("header.php");
    ?>
    <div class="wrapper">
        <main>
            
            
            
            <section class="info" id="details">
                
                <h1 id="pageTitle">
                    Pokémon

                    <span></span>

                </h1>    
                <section id="profileTextSection">

                    <section id="profileSection">

                        <img id="profile" alt="">

                    </section>

                    <section id="flavorTextContainer">
                        <h2>Description:</h2>
                        <p></p>

                        <select name="flavorText" id="flavorTextSelect">    
                            <option selected disabled value="">Game Version</option>
                        </select>

                    </section>

                </section>
                
                <!-- <audio id="cry" controls loop></audio> -->
            </section>

            <section id="typeStatSection">

                <section class="info" id="typeSection">

                    <section class="types info">
                        <h2>Type:</h2>
                        <div>
                            <div id="mainType"></div>
                            <div id="secondaryType"></div>
                        </div>     
                    </section>

                    <section class="types info">
                        <h2>Weak To:</h2>
                        <div id="weaknesses">
                            
                        </div>
                    </section>

                </section>
            
                <section class="info" id="statSection">
                    <h2>Base Stats:</h2>
                    <ul>

                    </ul>
                </section>

            </section>
            

            <h2>Evolutions:</h2>
            <section class="info" id="evolutions">
                <div class="evolution" id="firstEvolution"></div>
                <div class="arrow hidden">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div id="secondEvolution" class="evolution hidden"></div>
                <div class="arrow hidden">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div id="thirdEvolution" class="evolution hidden"></div>
            </section>

            
            <section id="">
            </section>

            <a id="linkBack" href="pokedex.php">Back To Browsing</a>
            <section class="pagination">
                <a class="previousPokemon">
                    <img alt="Image of the previous pokémon">
                    <div>
                        <h2></h2>
                        <span>
                        </span>
                    </div>
                    
                </a>
                <a class="nextPokemon">
                    <div>
                        <h2></h2>
                        <span>
                        </span>
                    </div>
                    <img alt="Image of the next pokémon">
                </a>
            </section>

        </main>
    </div>
    <?php
    require_once("footer.php");
    ?>
</body>
</html>