import axios from "axios";
import formatDate from "date-fns/format";
import subDays from "date-fns/subDays";

const BASE_URL = "https://api.covidtracking.com/v2beta";

async function getUSDataByDate(date: Date) {
  const formattedDate = formatDate(date, "yyyy-MM-dd");
  return axios.get(`${BASE_URL}/us/daily/${formattedDate}.json`);
}

export async function getLatestUSData() {
  const currentDate = new Date();

  let res;
  try {
    // Try today
    res = await getUSDataByDate(currentDate);
  } catch (e) {
    if (e?.response?.status === 404) {
      // Try yesterday if today is not ready yet
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

async function getStateDataByDate(state: string, date: Date) {
  const formattedDate = formatDate(date, "yyyy-MM-dd");
  return axios.get(
    `${BASE_URL}/states/${state.toLowerCase()}/${formattedDate}.json`
  );
}

export async function getLatestStateData(state: string) {
  const currentDate = new Date();

  let res;
  try {
    // Try today
    res = await getStateDataByDate(state, currentDate);
  } catch (e) {
    if (e?.response?.status === 404) {
      // Try yesterday if today is not ready yet
      try {
        res = await getStateDataByDate(state, subDays(currentDate, 1));
      } catch (e) {
        // do something
      }
    }
  }

  if (res?.data?.data) {
    return res?.data?.data;
  }

  throw new Error(`Unable to load latest ${state} data.`);
}

export async function getStateMetadata() {
  let res;
  try {
    res = await axios.get(`${BASE_URL}/states.json`);
  } catch (e) {
    // Something went wrong
  }

  if (res?.data?.data) {
    return res?.data?.data;
  }

  throw new Error("Unable to load state metadata.");
}
