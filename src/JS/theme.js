const themeBtnEl = document.querySelector("[data-theme]");
const bodyEl = document.querySelector("body");

let theme = localStorage.getItem("bgColor");

let colorDark;

if (theme === "light") {
  bgColorLight();
  colorDark = true;
} else {
  bgColorDark();
  colorDark = false;
}

themeBtnEl.addEventListener("click", changeBgColor);

function changeBgColor() {
  if (colorDark) {
    bgColorDark();

    colorDark = false;
  } else {
    bgColorLight();

    colorDark = true;
  }
}

function bgColorDark() {
  themeBtnEl.style.backgroundColor = "var(--light-color)";
  themeBtnEl.textContent = "Light";
  bodyEl.style.backgroundColor = "var(--dark-color)";
  localStorage.setItem("bgColor", "dark");
}

function bgColorLight() {
  themeBtnEl.style.backgroundColor = "var(--dark-color)";
  themeBtnEl.textContent = "Dark";
  bodyEl.style.backgroundColor = "var(--light-color)";
  localStorage.setItem("bgColor", "light");
}
