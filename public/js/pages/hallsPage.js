const form = document.getElementById("halls-form");

form.addEventListener(
  "submit",
  (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");

    if (form.checkVisibility()) {
      console.log("Form valid");
    }
  },
  false
);
