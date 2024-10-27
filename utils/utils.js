const { startOfWeek, endOfWeek } = require("date-fns");
function getOffsetLimit(page, pageSize) {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
}

function getWeekStartEndDates() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  return { startDate, endDate };
}

module.exports = {
  getOffsetLimit,
  getWeekStartEndDates,
};
