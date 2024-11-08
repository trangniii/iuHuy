<<<<<<< HEAD
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
=======
(() => {
  "use strict";

  const modalTitle = document.querySelector(".js--title");

  const form = document.querySelector(".needs-validation");
  const addBtn = document.querySelector(".js--add-btn");
  const editBtn = document.querySelector(".js--edit-btn");

  const nameInput = form.querySelector('input[name="name"]');
  const seatRowsInput = form.querySelector('input[name="seatRows"]');
  const seatColumnsInput = form.querySelector('input[name="seatColumns"]');

  addBtn.addEventListener("click", () => {
    modalTitle.textContent = "Thêm phòng chiếu";
    form.setAttribute("action", "/dashboard/halls/add");
    form.setAttribute("method", "POST");
    form.reset();
  });

  editBtn.addEventListener("click", () => {
    modalTitle.textContent = "Sửa phòng chiếu";
    const hall = editBtn.parentElement.parentElement.dataset.hall;

    const { name, seatRows, seatColumns, id } = JSON.parse(hall);

    form.setAttribute("action", `/dashboard/halls/${id}/update`);
    form.setAttribute("method", "POST");

    nameInput.setAttribute("value", name);
    seatRowsInput.setAttribute("value", seatRows);
    seatColumnsInput.setAttribute("value", seatColumns);

    form.reset();
  });

  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
})();
>>>>>>> dev/management
