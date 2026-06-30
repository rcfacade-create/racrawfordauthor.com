const enterAethelmarButton = document.getElementById("enterAethelmar");

if (enterAethelmarButton) {
  enterAethelmarButton.addEventListener("click", () => {
    const gates = document.querySelector(".aerie-gates");

    if (gates) {
      gates.classList.add("opening");
    }

    setTimeout(() => {
      window.location.href = "academy.html";
    }, 1200);
  });
}

/* Active navigation highlight */

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(
  ".aerie-top-links a, .aerie-location-nav a"
);

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("is-active");
  }
});