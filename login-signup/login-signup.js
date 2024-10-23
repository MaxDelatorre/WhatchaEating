const passwordInput = document.querySelector("#psw");
const repeatPasswordInput = document.querySelector("#psw-repeat");
const showPasswordCheckbox = document.querySelector("#showPassword");

showPasswordCheckbox.addEventListener("change", function () {
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      repeatPasswordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
      repeatPasswordInput.setAttribute("type", "password");
    }
  });