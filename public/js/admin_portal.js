const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle-arrow");

toggle.addEventListener("click",()=>{
    sidebar.classList.toggle("close");
    console.log("fhwihf");
})