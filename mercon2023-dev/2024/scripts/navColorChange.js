window.addEventListener("load", function () {
  const navbar = document.querySelector(".navbar");
  const main = document.querySelector(".main");

  // Check if the current location is index.html
  if (window.location.pathname.includes("index.html")) {
    navbar.classList.remove("bg-secondary");
    window.addEventListener("scroll", function () {
      const indicator = document.getElementById("arrowdown");
      const topContainer = document.querySelector(".hero-image");

      if (topContainer !== null) {
        const topContainerHeight = topContainer.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= topContainerHeight + 100) {
          navbar.classList.add("bg-secondary");
          indicator.style.animation = "none";
        } else {
          navbar.classList.remove("bg-secondary");
          indicator.style.animation = "jumpup 3s infinite";
        }
      }
    });
  }
});
