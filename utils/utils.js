const { startOfWeek, endOfWeek } = require("date-fns");
function getOffsetLimit(page, pageSize) {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
}

function getWeekStartEndDates() {
  const date = new Date();
  const startDate = startOfWeek(date);
  const endDate = endOfWeek(date);
  return { startDate, endDate };
}

function parseDateTime(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return { day, month, year, hour, minute };
}

function formatDateMonth(inputDate) {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

function formatDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

module.exports = {
  getOffsetLimit,
  getWeekStartEndDates,
  parseDateTime,
  formatDateMonth,
  formatDuration,
};
