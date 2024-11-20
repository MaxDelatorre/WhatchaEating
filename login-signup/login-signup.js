
const passwordInput = document.querySelector("#psw");
const repeatPasswordInput = document.querySelector("#psw-repeat");
const showPasswordCheckbox = document.querySelector("#showPassword");

//Passowrd toggle
showPasswordCheckbox.addEventListener("change", function () {
  if (passwordInput.getAttribute("type") === "password") {
    passwordInput.setAttribute("type", "email");
    repeatPasswordInput.setAttribute("type", "email");
  } else {
    passwordInput.setAttribute("type", "password");
    repeatPasswordInput.setAttribute("type", "password");
  }
});



//Password validation and user signup
document.querySelector("#signupForm").addEventListener("submit", function (event) {
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;
  
  if (password !== repeatPassword) {
    event.preventDefault(); // Prevent form submission
    alert("Passwords do not match. Please try again.");
  }
});

/*// For users logging in
document.querySelector("#loginForm").addEventListener("submit", function (event) {

});

*/
