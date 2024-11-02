module.exports = {
  CASH: "CASH",
  CARD: "CARD",
  PAYPAL: "PAYPAL",
  getDesc(paymentMethod) {
    switch (paymentMethod) {
      case this.CASH:
        return "Tiền mặt";
      case this.CARD:
        return "Thẻ tín dụng";
      case this.PAYPAL:
        return "Thanh toán trực tuyến";
      default:
        return "Unknown";
    }
  },
};
