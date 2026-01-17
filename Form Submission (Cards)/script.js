let form = document.querySelector("form");
let input = document.querySelectorAll("input");
let btn = document.querySelector(".btn");
let card = document.querySelector("card");
let h3 = document.querySelector("h3");
let img = document.querySelector(".img-circle");
let p = document.querySelectorAll("p");

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

btn.addEventListener("click", function () {
  h3.textContent = `${input[0].value}`;
  p[0].textContent = `${input[1].value}`;
  p[1].textContent = `${input[2].value}`;
  img.setAttribute("src", input[3].value);
});
