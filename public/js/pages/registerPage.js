const form = document.querySelector("#form-register-todo");

const email = document.querySelector(".js--email");

const password = document.querySelector(".js--password");

const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;

  const user = {
    email: emailValue,
    password: passwordValue,
  };
  console.log(user);
  submitBtn.classList.add("is-loading");
  const res = await fetch("/todo/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  submitBtn.classList.remove("is-loading");
  if (res.ok) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="column">
        <div class="notification is-success">
          <button class="delete"></button>
          Register successfully
        </div>
      </div>
      `;
    form.before(div);
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="column">
        <div class="notification is-danger">
          <button class="delete"></button>
          User already exists!
        </div>
      </div>
      `;
    form.before(div);
  }
});
