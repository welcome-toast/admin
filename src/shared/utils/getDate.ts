type DateString = string;

interface CurrentDateObject {
  year: number;
  month: number;
  currentDate: number;
  currentDay: number;
  currentHour: string;
  currentMinute: number;
}

function getDate(dateString: DateString): CurrentDateObject {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const currentDate = date.getDate();
  const currentDay = date.getDay();

  const currentHour =
    date.getHours() > 12 ? `오후 ${date.getHours() - 12}` : `오전 ${date.getHours()}`;
  const currentMinute = date.getMinutes();

  return { year, month, currentDate, currentDay, currentHour, currentMinute };
}

export { getDate };
