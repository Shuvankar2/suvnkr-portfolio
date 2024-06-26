

    // Utility JS

            // For All Pages

          // Pre_Loading bar
          document.addEventListener("DOMContentLoaded", function() {
              var filled = document.querySelector(".filled");
              var width = 0;
              var interval = setInterval(function() {
                  if (width >= 80) {
                      clearInterval(interval);
                      setTimeout(function() {
                          filled.style.transition = 'width 5ms linear';
                          width = 100;
                          filled.style.width = width + '%';
                          setTimeout(function() {
                              filled.style.transition = 'none';
                              filled.style.width = '0%'; // Reset the width to 0%
                          }, 300);
                      }, 300);
                  } else {
                      width++;
                      filled.style.width = width + '%'; // Increase the width of the filled element
                  }
              }, 20);
          });
  
          // Landing Image - Changes after 5 seconds
          document.addEventListener("DOMContentLoaded", function() {
      const images = [
          '/img/bg-landing.jpg',
          '/img/bg-landing2.jpg',
          '/img/bg-landing3.jpg'
      ];
  
      let currentImageIndex = 0;
      const imageSlider = document.querySelector('.img-slider-landing');
  
      function changeBackgroundImage() {
          imageSlider.classList.add('slide-out');
          setTimeout(() => {
              currentImageIndex = (currentImageIndex + 1) % images.length;
              imageSlider.style.backgroundImage = `url(${images[currentImageIndex]})`;
              imageSlider.classList.remove('slide-out');
              imageSlider.classList.add('slide-in');
          }, 500); // Adjust timing as needed for slide-out duration
          setTimeout(() => {
              imageSlider.classList.remove('slide-in');
          }, 1000); // Adjust timing as needed for slide-in duration
      }
  
      setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds
  
      // Initialize with the first image
      changeBackgroundImage();
  });
  
      // Experience btn Toggle Activity
      function toggleDetails(element) {
      const details = element.parentElement.querySelector('.description');
      if (details.classList.contains('show')) {
          details.classList.remove('show');
          element.classList.remove('active');
      } else {
          details.classList.add('show');
          element.classList.add('active');
      }
  }
  
// Menu More
document.addEventListener("DOMContentLoaded", function() {
    const navBar = document.querySelector("nav"),
        menuBtns = document.querySelectorAll(".menu-bar"),
        overlay = document.querySelector(".menu-overlay"),
        closeMenuBtn = document.querySelector(".close-menu-bar");

    menuBtns.forEach(menuBtn => {
        menuBtn.addEventListener("click", () => {
            navBar.classList.toggle("open");
            document.body.classList.toggle("no-scroll");
        });
    });

    overlay.addEventListener("click", () => {
        navBar.classList.remove("open");
        document.body.classList.remove("no-scroll");
    });

    closeMenuBtn.addEventListener("click", () => {
        navBar.classList.remove("open");
        document.body.classList.remove("no-scroll");
    });
});

    

          // Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show or hide the button based on scroll position
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

  
  