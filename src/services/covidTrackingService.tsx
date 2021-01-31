import axios from "axios";
import formatDate from "date-fns/format";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

const BASE_URL = "https://api.covidtracking.com/v2beta";

async function getUSDataByDate(date: Date) {
  const formattedDate = formatDate(date, "yyyy-MM-dd");
  return axios.get(`${BASE_URL}/us/daily/${formattedDate}.json`);
}

export async function getLatestUSData() {
  const currentDate = addDays(new Date(), 1);

  let res;
  try {
    // Try today
    res = await getUSDataByDate(currentDate);
  } catch (e) {
    if (e?.response?.status === 404) {
      try {
        res = await getUSDataByDate(subDays(currentDate, 1));
      } catch (e) {
        // do something
      }
    }
  }

  if (res?.data?.data) {
    return res?.data?.data;
  }

  throw new Error("Unable to load latest US data.");
}
