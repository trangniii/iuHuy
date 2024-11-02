const PriceOfSeat = require("../models/PriceOfSeat");

const priceService = {
  async getPrices() {
    return PriceOfSeat.findAll({
      order: [["price", "ASC"]],
    });
  },

  calculatePriceOfSeat(prices, row) {
    const price = prices.find(
      (price) => price.startRow <= row && price.endRow >= row
    );
    return price ? price.price : price?.[0] ?? 0;
  },

  async calculatePriceOfRow(row) {
    const prices = await this.getPrices();
    return this.calculatePriceOfSeat(prices, row);
  },
};

module.exports = priceService;
