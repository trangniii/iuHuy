const seats = document.querySelectorAll(".js--seat-btn");
const seatSelected = document.querySelector(".js--seat-selected");
const totalPrice = document.querySelector(".js--total-price");
const bookingBtn = document.querySelector(".js--booking");
let selectedSeats = [];

async function updateSelectedSeats() {
  seatSelected.innerHTML = selectedSeats.map((seat) => seat.name).join(", ");
}

async function updateTotalPrice() {
  totalPrice.innerHTML =
    selectedSeats.reduce((total, seat) => total + Number(seat.price), 0) + " đ";
}

function isSelectedSeat(seat) {
  return selectedSeats.some(
    (selectedSeat) =>
      selectedSeat.row === seat.row && selectedSeat.number === seat.number
  );
}

seats.forEach((btn) => {
  btn.addEventListener("click", () => {
    const info = JSON.parse(btn.dataset.seat);
    if (info.status === "BOOKED") return;

    if (isSelectedSeat(info)) {
      selectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          selectedSeat.row !== info.row || selectedSeat.number !== info.number
      );
    } else {
      selectedSeats.push(info);
    }

    btn.classList.toggle("selected");
    updateTotalPrice();
    updateSelectedSeats();
  });
});

async function bookingTicket(showtimeId, seats) {
  return fetch(`/booking/${showtimeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seats }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw data;
      });
    }

    return res.json();
  });
}

bookingBtn.addEventListener("click", async () => {
  if (selectedSeats.length === 0) {
    return showMessage("Vui lòng chọn ít nhất một vé!", "danger");
  }
  const showtimeId = bookingBtn.dataset.showtime;

  try {
    const { paymentId } = await bookingTicket(showtimeId, selectedSeats);

    window.location.href = `/checkout/${paymentId}`;
  } catch (error) {
    showToast(error.message, "danger");
  }
});
