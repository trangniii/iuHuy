const form = document.querySelector(".form-register");

const error = document.querySelector(".error");

const email = document.querySelector(".js--email");

const password = document.querySelector(".js--password");

const confirmPassword = document.querySelector(".js--confirmPassword");

const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const confirmPasswordValue = confirmPassword.value;
  const passwordValue = password.value;

  if (passwordValue != confirmPasswordValue) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="alert alert-danger" role="alert">
      Mật khẩu không khớp!
      </div>
      `;
    error.appendChild(div);
  } else {
    form.submit();
  }
});
