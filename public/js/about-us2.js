const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];




let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
        const newPosition = carousel.scrollLeft + direction * cardWidth;
        carousel.scrollTo({
            left: newPosition,
            behavior: "smooth"
        });
    });
});




 

  arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const carousel = document.querySelector(".carousel");
  const videoFrames = carousel.querySelectorAll("iframe");
  const arrowIcons = document.querySelectorAll(".wrapper i");
  
  
  
  
  
  
  
  const videoWidth = videoFrames[0].clientWidth + 10;
  const totalVideos = videoFrames.length;
  let visibleVideos = 3;
  
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
  
  