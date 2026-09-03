import { AnalyticalDateTimeframe, AnalyticalDataPoint } from "../types/analyticalData.types";
declare function getRangeWindow(timeframe: AnalyticalDateTimeframe): {
    start: Date;
    end: Date;
    bucket: "day" | "month";
};
declare function BuildEmptyBuckets(start: Date, end: Date, bucket: "day" | "month"): Map<string, AnalyticalDataPoint>;
export { getRangeWindow, BuildEmptyBuckets };
//# sourceMappingURL=analyticHelpers.d.ts.map