<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../styles/loginStyle.css">
</head>
<body>
    <?php
    require_once("header.php");
    ?>
    <div class="wrapper">
        <main>
            <section>
                <h1 id="pageTitle">Log In!</h1>
            </section>
            <section id="formSection">
                <form id="loginForm" action="">
                    <label for="usernameInput">Username: </label>
                    <input type="text" name="username" placeholder="Username" id="usernameInput">
                    <label for="passwordInput">Password: </label>
                    <input type="password" name="password" placeholder="Password" id="passwordInput">
                    <input type="submit" value="Log In">
                </form>
            </section>
            
        </main>
    </div>
   
    
    <?php
    require_once("footer.php");
    ?>
    
</body>
</html>