//Javascript for Highlights Wrapper

const carousel = document.querySelector(".carousel");
const videoFrames = carousel.querySelectorAll("iframe");
const arrowIcons = document.querySelectorAll(".wrapper i");







const videoWidth = videoFrames[0].clientWidth + 10;
const totalVideos = videoFrames.length;
let visibleVideos = 3;


// dynamic changing of sportname

if(localStorage.getItem("check") == 1){
    document.getElementsByClassName("game_name")[0].innerHTML = "Basket ball"
}else{
    document.getElementsByClassName("game_name")[0].innerHTML = localStorage.getItem("name");
}

const updateVisibleVideos = () => {
    if (window.innerWidth <= 576) {
        visibleVideos = 1;
    } else if (window.innerWidth <= 768) {
        visibleVideos = 2;
    } else {
        visibleVideos = 3;
    }


   
    showHideVideos();
    showHideIcons();
};

let currentIndex = 0;


const showHideVideos = () => {
    videoFrames.forEach((frame, index) => {
        if (index >= currentIndex && index < currentIndex + visibleVideos) {
            frame.style.display = "block";
            
        } else {
            frame.style.display = "none";
            
        }
    });

    
};

const showHideIcons = () => {
    arrowIcons[0].style.display = currentIndex === 0 ? "none" : "block";
    arrowIcons[1].style.display = currentIndex >= totalVideos - visibleVideos ? "none" : "block";
};

arrowIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        currentIndex += index === 0 ? -1 : 1;
        currentIndex = Math.max(currentIndex, 0);
        currentIndex = Math.min(currentIndex, totalVideos - visibleVideos);

        showHideVideos();
        showHideIcons();
    });
});

window.addEventListener("resize", () => {
    updateVisibleVideos();
});

updateVisibleVideos();
showHideIcons();


// Your existing JavaScript code for handling hover and navigation
// ...

// Code for handling hover effect on video frames
videoFrames.forEach((frame) => {
    frame.addEventListener("mouseenter", () => {
        frame.classList.add("hovered");
    });

    frame.addEventListener("mouseleave", () => {
        frame.classList.remove("hovered");
    });
});



// ... Existing JavaScript code ...

// Add the following code to update the video titles


// Fetch the video title elements

