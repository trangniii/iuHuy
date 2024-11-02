const checkingForm = document.querySelector("#checking-form");
const toastLiveEl = document.getElementById("liveToast");

const toastLive = bootstrap.Toast.getOrCreateInstance(toastLiveEl);

function showToast(message, type) {
  toastLiveEl.querySelector(".toast-body").textContent = message;
  toastLiveEl.classList = `toast text-white bg-${type}`;
  toastLive.show();
}

async function pay(paymentId, method) {
  const url = `/checkout/${paymentId}`;

  const response = await fetch(url, {
    body: JSON.stringify({ method }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.text();
  }

  return response.json().then((error) => {
    throw error;
  });
}

function getPaymentMethod() {
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  ).value;

  return paymentMethod;
}

checkingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const paymentId = checkingForm.dataset.paymentId;
  const paymentMethod = getPaymentMethod();

  try {
    const res = await pay(paymentId, paymentMethod);
    document.body.innerHTML = res;
  } catch (error) {
    console.error(error);
    showToast(error.message, "danger");
  }
});
