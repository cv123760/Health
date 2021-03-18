const burgerMenu = document.querySelector(".bmenu")
const nav1 = document.getElementById("nav1")

burgerMenu.addEventListener("click", function(){
    if (nav1.style.display === "none") {
        nav1.style.display = "block";
      } else {
        nav1.style.display = "none";
      }
});