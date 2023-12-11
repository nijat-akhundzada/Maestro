document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.querySelector('input[placeholder="UserName"]');
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const countrySelect = document.getElementById("country");
  const sendButton = document.querySelector(".send-btn");
  const mainForm = document.getElementById("main-form");

  sendButton.addEventListener("click", function (event) {
    const usernameError = validateField(usernameInput.value, "Username");
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);
    const countryError = validateField(countrySelect.value, "Country");

    displayError(usernameInput, usernameError);
    displayError(emailInput, emailError);
    displayError(passwordInput, passwordError);
    displayError(countrySelect, countryError);

    if (usernameError || emailError || passwordError || countryError) {
      event.preventDefault();
    }
    else {
      window.location.reload;
    }
  });

  function validateField(value, fieldName) {
    return value.trim() !== "" ? "" : `${fieldName} is required.`;
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) ? "" : "Enter a valid Email";
  }
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#^_]).{10,}$/;
    const isLessSecure =
      /^(?=.*[A-Z])(?=.*[@$!%*?&#^_])[a-zA-Z@$!%*?&#^_]{8,}$/.test(password);

    if (isLessSecure) {
      return "Your password is less secure. Consider using a mix of uppercase, lowercase, symbols, and numbers.";
    }

    return passwordRegex.test(password)
      ? "Password is secure."
      : "Enter a valid password.";
  }

  let count = 1;
  function displayError(input, error) {
    const formGroup = input.closest(".form-group");
    const errorContainer = formGroup.querySelector(".error-message");

    if (error) {
      if (!errorContainer) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.textContent = error;
        formGroup.appendChild(errorMessage);
      } else {
        errorContainer.textContent = error;
        errorContainer.style.display = "block";
      }
    } else {
      if (errorContainer) {
        errorContainer.textContent = "";
        errorContainer.style.display = "none";
      }
    }

    if (input.type === "password") {
      passwordInput.classList = "UserName password";
      const pathes = document.querySelectorAll(".passwordicon path");
      const icon = document.querySelector("#icon");
      document.querySelector(".line").style.display = "flex";
      if (error === "Enter a valid password.") {
        passwordInput.classList.add("error-1");
        pathes.forEach((path) => {
          path.style.fill = "#E74A3B";
        });
        icon.src = "./Error-logo.svg";
        document.querySelector(".pPas").style.color = "#E74A3B";
        errorContainer.style.color = "#E74A3B";
      } else if (error === "Password is secure.") {
        passwordInput.classList.add("validate-password");
        pathes.forEach((path) => {
          path.style.fill = "#3CBC81";
        });
        icon.src = "./Vector.svg";
        document.querySelector(".pPas").style.color = "#3CBC81";
        errorContainer.style.color = "#3CBC81";
      } else {
        passwordInput.classList.add("less-secure");
        pathes.forEach((path) => {
          path.style.fill = "#F6C23E";
        });
        icon.src = "./Warning-logo.svg";
        document.querySelector(".pPas").style.color = "#F6C23E";
        errorContainer.style.color = "#F6C23E";
      }
    }
  }

  // Real-time password validation while typing
  passwordInput.addEventListener("input", function () {
    const passwordError = validatePassword(passwordInput.value);
    displayError(passwordInput, passwordError);

  });

  let count2 = 1;
  passwordInput.addEventListener("focus", function () {
    passwordInput.style.outlineColor = "#5D5FEF"; // Keep the outline color if needed
    passwordInput.setAttribute("placeholder", "●".repeat(10));

    // Customize the circle color and size
    // passwordInput.style.color = '#808080'; // Change color to grey
    passwordInput.style.fontSize = "18px"; // Adjust the font size to make the circles smaller

    // if (count2++ === 1) {
    const p = document.createElement("p"); // Fix the typo: document.createElement
    p.className = "pPas";
    p.innerHTML = "Password";
    document.querySelector(".form-group:has(.password)").appendChild(p);
    // }
  });

  passwordInput.addEventListener("blur", function () {
    if (passwordInput.value === "") {
      passwordInput.style.borderColor = "#D9D9D9";
      passwordInput.setAttribute("placeholder", "Password");

      // Reset the color and font size on blur
      passwordInput.style.color = ""; // Reset to default color
      passwordInput.style.fontSize = "18px"; // Reset to default font size

      const pPasElement = document.querySelectorAll(".pPas");
      pPasElement.forEach((p) => {
        document.querySelector(".form-group:has(.password)").removeChild(p);
      });
    }
  });
});
