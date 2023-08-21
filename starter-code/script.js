document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.querySelector(".password");
  const copyButton = document.querySelector(".copy-img");
  const characterSlider = document.getElementById("characterSlider");
  const sliderValueSpan = document.getElementById("sliderValue");
  const passwordStrengthBars = document.querySelectorAll(".bar");
  const generateButton = document.querySelector(".generator");

  characterSlider.addEventListener("input", function () {
    sliderValueSpan.textContent = characterSlider.value;
    updatePasswordStrength(parseInt(characterSlider.value));
  });
  copyButton.addEventListener("click", function () {
    copyPassword();
  });

  generateButton.addEventListener("click", function () {
    if (
      !document.getElementById("includeLowercase").checked &&
      !document.getElementById("includeUppercase").checked &&
      !document.getElementById("includeNumbers").checked &&
      !document.getElementById("includeSymbols").checked
    ) {
      passwordInput.value = "Click the boxes";
    } else {
      generatePassword();
    }
  });

  function generatePassword() {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "#¤%&?!-_<>|§½/()";

    let characters = "";

    if (document.getElementById("includeLowercase").checked) {
      characters += lowercaseChars;
    }
    if (document.getElementById("includeUppercase").checked) {
      characters += uppercaseChars;
    }
    if (document.getElementById("includeNumbers").checked) {
      characters += numberChars;
    }
    if (document.getElementById("includeSymbols").checked) {
      characters += symbolChars;
    }

    const passwordLength = parseInt(characterSlider.value);
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    passwordInput.value = password;
    updatePasswordStrength(passwordLength);
  }

  function copyPassword() {
    passwordInput.select();
    document.execCommand("copy");

    copyButton.src = "../images/checkmark.svg";
    copyButton.classList.add("active");

    popup.classList.add("active");

    setTimeout(() => {
      copyButton.src = "../images/copy-icon.svg";
      copyButton.classList.remove("active");
      popup.classList.remove("active");
    }, 5000);
  }
  function updatePasswordStrength(length) {
    const maxBars = length <= 8 ? length : 18;

    for (let i = 0; i < passwordStrengthBars.length; i++) {
      if (i < maxBars - 4) {
        passwordStrengthBars[i].style.backgroundColor = "#ffa257";
      } else {
        passwordStrengthBars[i].style.backgroundColor = "transparent";
      }
    }

    const strengthText = document.querySelector(".strength-text");
    if (maxBars <= 4) {
      strengthText.textContent = "Weak";
      strengthText.style.color = "red";
    } else if (maxBars <= 7) {
      strengthText.textContent = "Medium";
      strengthText.style.color = "orange";
    } else {
      strengthText.textContent = "Strong";
      strengthText.style.color = "green";
    }
  }
});
