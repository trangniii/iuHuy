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

  async addPrice(priceData) {
    const newPrice = await PriceOfSeat.create(priceData);
  },

  async updatePriceById(id, updatedData) {
    const priceEntry = await PriceOfSeat.findByPk(id);
    if (priceEntry) {
      await priceEntry.update(updatedData);
      return priceEntry;
    }
    return null;
  },

  async deletePriceById(id) {
    const deletedCount = await PriceOfSeat.destroy({
      where: { id },
    });
    return deletedCount > 0;
  },

  async getPriceById(id) {
    const priceEntry = await PriceOfSeat.findByPk(id);
    return priceEntry;
  },
};

module.exports = priceService;
