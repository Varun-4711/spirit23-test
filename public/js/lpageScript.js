var accordions = document.querySelectorAll(".container");

accordions.forEach(function (accordion) {
  var header = accordion.querySelector(".accordion");
  var content = accordion.querySelector(".pannel");
  var icon = accordion.querySelector("i");

  header.addEventListener("click", function () {
    accordion.classList.toggle("active");
    if (accordion.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "vw";
      icon.style.transform = "rotate(180deg)";
    } else {
      content.style.maxHeight = null;
      icon.style.transform = "rotate(0deg)";
    }
  });
});
//prem
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("hlinks");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("active");
});

// RAHUL
function updateValue(targetValue, valueElement) {
  const increment = Math.ceil(targetValue / 60); // Divide target by 60 to reach in 1 second
  let currentValue = 0;
  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(interval);
    }
    valueElement.innerText = currentValue.toLocaleString();
  }, 1000 / 60);
}

const audienceValueElement = document.getElementById("audienceValue");
const sponsorsValueElement = document.getElementById("sponsorsValue");
const footfallValueElement = document.getElementById("footfallValue");
const customersValueElement = document.getElementById("customersValue");

const audienceTarget = 30;
const sponsorsTarget = 4000;
const footfallTarget = 100;
const customersTarget = 40;

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const odometerElement = document.getElementById("odometer");
let hasRun = false; 

// Listen for scroll and resize events
window.addEventListener("scroll", () => {
  if (!hasRun && isVisible(odometerElement)) {
    hasRun = true; // Set the flag to true

    odometerElement.style.visibility = "visible";
    odometerElement.style.opacity = "1";

    startAnimation();
  }
});

function startAnimation() {
  updateValue(audienceTarget, audienceValueElement);
  updateValue(sponsorsTarget, sponsorsValueElement);
  updateValue(footfallTarget, footfallValueElement);
  updateValue(customersTarget, customersValueElement);
}



async function sports() {
  const apikey = "e5a6e05216a74477b5ea26e1c01864ce";
  const apiUrl =
    "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
  const response = await fetch(apiUrl + `${apikey}`);
  var data = await response.json();
  console.log(data);
  document.querySelector(".h0").innerHTML = data.articles[1].title;
  document.querySelector(".des0").innerHTML = data.articles[1].description;
  const iconUrl = data.articles[1].urlToImage;
  const imgElement = document.getElementById("img_style1");
  imgElement.src = iconUrl;

  document.querySelector(".h1").innerHTML = data.articles[2].title;
  document.querySelector(".des1").innerHTML = data.articles[2].description;
  const iconUrl1 = data.articles[2].urlToImage;
  const imgElement1 = document.getElementById("img_style2");
  imgElement1.src = iconUrl1;

  document.querySelector(".h2").innerHTML = data.articles[3].title;
  document.querySelector(".des2").innerHTML = data.articles[3].description;
  const iconUrl2 = data.articles[3].urlToImage;
  const imgElement2 = document.getElementById("img_style3");
  imgElement2.src = iconUrl2;

  document.querySelector(".h3").innerHTML = data.articles[4].title;
  document.querySelector(".des3").innerHTML = data.articles[4].description;
  const iconUrl3 = data.articles[4].urlToImage;
  const imgElement3 = document.getElementById("img_style4");
  imgElement3.src = iconUrl3;
}
sports();

