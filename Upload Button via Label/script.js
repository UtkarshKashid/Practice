let btn = document.querySelector(".upload-btn");
let fileinp = document.querySelector("input");

btn.addEventListener("click", function () {
  fileinp.click();
});

fileinp.addEventListener("change", function (evt) {
  const file = evt.target.files[0];
  if (file) {
    btn.textContent = file.name;
  }
});
