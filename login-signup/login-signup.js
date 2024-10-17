// Function to toggle the password visibility
function togglePassword() {
    const passwordField = document.getElementById('psw');
    const showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}