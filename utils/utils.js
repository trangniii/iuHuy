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

function parseDateTime(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return { day, month, year, hour, minute };
}

function formatDateMonth(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

module.exports = {
  getOffsetLimit,
  getWeekStartEndDates,
  parseDateTime,
  formatDateMonth,
};
