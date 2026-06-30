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