const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".loader-overlay");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

let firstMove = true;

function moveNoBtn() {
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const pad = 20;

  if (firstMove) {
    const placeholder = document.createElement("div");
    placeholder.style.width = btnW + "px";
    placeholder.style.height = btnH + "px";
    placeholder.style.visibility = "hidden";
    noBtn.parentNode.insertBefore(placeholder, noBtn);

    const rect = noBtn.getBoundingClientRect();
    noBtn.style.position = "fixed";
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";
    noBtn.style.margin = "0";
    noBtn.offsetHeight;
    noBtn.style.transition = "left 0.4s ease, top 0.4s ease, transform 0.15s ease";
    firstMove = false;
  }

  const maxX = window.innerWidth - btnW - pad;
  const maxY = window.innerHeight - btnH - pad;

  const newX = Math.floor(Math.random() * Math.max(maxX - pad, 1)) + pad;
  const newY = Math.floor(Math.random() * Math.max(maxY - pad, 1)) + pad;

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

noBtn.addEventListener("mouseover", moveNoBtn);

document.addEventListener("touchstart", function(e) {
  var target = e.target;
  if (target === noBtn || target.closest(".js-no-btn")) {
    e.preventDefault();
    e.stopPropagation();
    moveNoBtn();
  }
}, { passive: false, capture: true });

document.addEventListener("click", function(e) {
  var target = e.target;
  if (target === noBtn || target.closest(".js-no-btn")) {
    e.preventDefault();
    e.stopPropagation();
    moveNoBtn();
  }
}, true);

yesBtn.addEventListener("click", function() {
  questionContainer.style.display = "none";
  noBtn.style.display = "none";
  heartLoader.style.display = "flex";

  setTimeout(function() {
    heartLoader.style.display = "none";
    resultContainer.style.display = "flex";
    gifResult.play();
  }, 3000);
});
