document.addEventListener("DOMContentLoaded", () => {
  const topNavHamburger = document.getElementById("top-nav-hamburger");
  const topNavMenu = document.getElementById("top-nav-menu");

  topNavHamburger.addEventListener("click", () => {
    topNavMenu.classList.toggle("active");
  });
});
