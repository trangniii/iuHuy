const formAdd = document.querySelector("#form-add");
const rowStart = document.querySelector("#row-start");
const validationRS = document.querySelector("#validationRowStart");
const rowEnd = document.querySelector("#row-end");
const validationRE = document.querySelector("#validationRowEnd");
const price = document.querySelector("#price");
const validationPrice = document.querySelector("#validationPrice");

rowStart.addEventListener("click", () => {
  rowStart.classList.remove("is-invalid");
  validationRS.innerHTML = "";
});
rowEnd.addEventListener("click", () => {
  rowEnd.classList.remove("is-invalid");
  validationRE.innerHTML = "";
});
price.addEventListener("click", () => {
  price.classList.remove("is-invalid");
  validationPrice.innerHTML = "";
});
formAdd.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (rowStart.value <= 0 || rowStart.value == "") {
    rowStart.classList.add("is-invalid");
    validationRS.innerHTML = "Hàng bắt đầu phải lớn hơn 0";
  } else if (rowEnd.value <= 0 || rowEnd.value == "") {
    rowEnd.classList.add("is-invalid");
    validationRE.innerHTML = "Hàng kết thúc phải lớn hơn 0";
  } else if (rowEnd.value <= rowStart.value) {
    rowEnd.classList.add("is-invalid");
    validationRE.innerHTML = "Hàng kết thúc phải lớn hơn hàng đầu";
  } else if (price.value <= 0 || price.value == "") {
    price.classList.add("is-invalid");
    validationPrice.innerHTML = "Giá tiền phải lớn hơn 0";
  } else formAdd.submit();
});
