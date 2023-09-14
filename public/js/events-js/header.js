const hamburger = document.getElementById("hamburger1");
const navList = document.getElementById("hlinks");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("active");
});
