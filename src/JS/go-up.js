const goUpBtnEl = document.querySelector("[data-go-up-btn]");

goUpBtnEl.addEventListener("click", goUp);
window.addEventListener("scroll", () => {
  window.scrollY >= 100
    ? (goUpBtnEl.style.opacity = 1)
    : (goUpBtnEl.style.opacity = 0);
});

function goUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
