const form = document.querySelector("#form-login");

const email = document.querySelector(".js--email");

const password = document.querySelector(".js--password");

const submitBtn = document.querySelector('button[type="submit"]');

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    clearError(input);
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
});

function insertError(input, message) {
  input.classList.add("is-danger");
  const parent = input.parentElement;
  parent.querySelector(".help")?.remove();
  const pElement = document.createElement("p");
  pElement.classList.add("help", "is-danger");
  pElement.innerText = message;
  parent.appendChild(pElement);
}

function removeError(input) {
  input.classList.remove("is-danger");
  const parent = input.parentElement;
  parent.querySelector(".help")?.remove();
}

function insertNotification(element, message, type = "is-success") {
  element.querySelector(".js--notification")?.remove();
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("notification", type, "js--notification");
  notificationElement.innerText = message;
  element.append(notificationElement);
}

function clearError(input) {
  input.classList.remove("is-danger");
  const parent = input.parentElement;
  parent.querySelector(".help")?.remove();
}
