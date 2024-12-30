// Sidebar open/close
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");

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

// Dropdown toggle
let dropdownArrows = document.querySelectorAll(".arrow");
dropdownArrows.forEach((arrow) => {
  arrow.onclick = function () {
    let parent = arrow.closest("li");
    if (parent) {
      let subMenu = parent.querySelector(".sub-menu");
      if (subMenu) {
        if (subMenu.classList.contains("show")) {
          // Close dropdown
          subMenu.classList.remove("show");
          arrow.classList.remove("rotate");
        } else {
          // Close other dropdowns
          document.querySelectorAll(".sub-menu.show").forEach((openMenu) => {
            openMenu.classList.remove("show");
            let openArrow = openMenu.closest("li").querySelector(".arrow");
            if (openArrow) openArrow.classList.remove("rotate");
          });
          // Open current dropdown
          subMenu.classList.add("show");
          arrow.classList.add("rotate");
        }
      }
    }
  };
});