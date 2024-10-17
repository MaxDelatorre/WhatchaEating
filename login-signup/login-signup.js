const passwordInput = document.querySelector("#psw");
const showPasswordCheckbox = document.querySelector("#showPassword");

showPasswordCheckbox.addEventListener("change", function () {
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
    }
  });