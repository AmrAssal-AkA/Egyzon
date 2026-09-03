import {
  AnalyticalDateTimeframe,
  AnalyticalData,
  AnalyticalDataPoint,
} from "../types/analyticalData.types";

const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toLocalIODateString(d: Date): string {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getRangeWindow(timeframe: AnalyticalDateTimeframe){
  const now = new Date();
  const end = now;
  let start: Date;
  let bucket: "day" | "month";

  switch (timeframe) {
    case AnalyticalDateTimeframe.SEVEN_DAYS:
      start = new Date(now);
      start.setDate(now.getDate() - 6);
      bucket = "day";
      break;
    case AnalyticalDateTimeframe.THIRTY_DAYS:
      start = new Date(now);
      start.setDate(now.getDate() - 29);
      bucket = "day";
      break;
    case AnalyticalDateTimeframe.twelve_MONTHS:
      start = new Date(now);
      start.setMonth(now.getMonth() - 11);
      bucket = "month";
      break;
    default:
      throw new Error("Invalid timeframe");
  }
  start.setHours(0, 0, 0, 0);
  return {  start, end, bucket };
}

function BuildEmptyBuckets(
  start: Date,
  end: Date,
  bucket: "day" | "month",
): Map<string, AnalyticalDataPoint> {
  const buckets = new Map<string, AnalyticalDataPoint>();

  if (bucket === "day") {
    const cursor = new Date(start);
    while (cursor <= end) {
      const iso = toLocalIODateString(cursor);
      buckets.set(iso, {
        label: DaysOfWeek[cursor.getDay()] ?? "",
        date: iso,
        revenue: 0,
        orders: 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    const cursor = new Date(start);
    cursor.setDate(1);
    while (cursor <= end) {
      const key = `${cursor.getFullYear()}-${(cursor.getMonth() + 1).toString().padStart(2, "0")}`;
      buckets.set(key, {
        label: cursor.toLocaleString("en-US", { month: "short" }),
        date: `${key} - 01`,
        revenue: 0,
        orders: 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }
  return buckets;
}

export { getRangeWindow, BuildEmptyBuckets };