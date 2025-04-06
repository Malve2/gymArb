let bars = document.getElementById("menuBars");
bars.addEventListener("click", toggleBars);
let menu = document.querySelector("#pageHeader nav ul");
function toggleBars()
{
    menu.classList.toggle("visible");
    if(menu.classList.contains("visible"))
    {
        bars.style.transform = "rotate(90deg)";
    }
    else
    {
        bars.style.transform = "rotate(0deg)";
    }
    

}