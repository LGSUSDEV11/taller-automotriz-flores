window.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelectorAll(".hamburger");

  hamburger.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});
