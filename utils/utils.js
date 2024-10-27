import { endOfWeek, startOfWeek } from "date-fns";

export function getOffsetLimit(page, pageSize) {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
}

export function getWeekStartEndDates() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  return { startDate, endDate };
}
