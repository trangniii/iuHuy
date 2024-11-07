const toastLiveEl = document.getElementById("liveToast");

const toastLive = bootstrap.Toast.getOrCreateInstance(toastLiveEl);

function showToast(message, type) {
  toastLiveEl.querySelector(".toast-body").textContent = message;
  toastLiveEl.classList = `toast text-white bg-${type}`;
  toastLive.show();
}
