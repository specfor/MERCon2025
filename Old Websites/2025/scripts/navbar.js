// Select elements
const navLinks = document.querySelector(".nav-links");
const menuOpenBtn = document.querySelector(".navbar .bx-menu");
const menuCloseBtn = document.querySelector(".nav-links .bx-x");

// Keep mobile menu functionality
if (menuOpenBtn && navLinks) {
  menuOpenBtn.onclick = function () {
    navLinks.style.left = "0";
  };
}

if (menuCloseBtn && navLinks) {
  menuCloseBtn.onclick = function () {
    navLinks.style.left = "-100%";
  };
}

// Add hover functionality for desktop
const dropdownItems = document.querySelectorAll(".links > li");

dropdownItems.forEach((item) => {
  const subMenu = item.querySelector(".sub-menu");
  const arrow = item.querySelector(".arrow");

  if (subMenu && arrow) {
    // Handle mouse enter
    item.addEventListener("mouseenter", () => {
      // Close other open menus first
      document.querySelectorAll(".sub-menu.show").forEach((openMenu) => {
        if (openMenu !== subMenu) {
          openMenu.classList.remove("show");
          const openArrow = openMenu.parentElement.querySelector(".arrow");
          if (openArrow) openArrow.classList.remove("rotate");
        }
      });

      // Open current menu
      subMenu.classList.add("show");
      arrow.classList.add("rotate");
    });

    // Handle mouse leave
    item.addEventListener("mouseleave", () => {
      subMenu.classList.remove("show");
      arrow.classList.remove("rotate");
    });
  }
});
