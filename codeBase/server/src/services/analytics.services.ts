import Order from "../models/orderModel";
import mongoose from "mongoose";

import { getRangeWindow, BuildEmptyBuckets } from "../utils/analyticHelpers";
import {
  AnalyticalDateTimeframe,
  AnalyticalData,
  AnalyticalDataPoint,
} from "../types/analyticalData.types";
import {Platform} from "../models/paltformConfigSetting";
import { SellerServices } from "./seller.services";


export const Analytical = {
  async getSellerAnalytics(
    sellerId: string,
    timeframe: AnalyticalDateTimeframe,
  ): Promise<AnalyticalData> {
    const { start, end, bucket } = getRangeWindow(timeframe);

    const windowMe = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - windowMe);
    const prevEnd = new Date(start.getTime() - 1); 

    const seller = new mongoose.Types.ObjectId(sellerId);
  
    const dateGroupExpr =
      bucket === "day"
        ? { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        : { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
    const [grouped, prevAggregate] = await Promise.all([
      Order.aggregate<{ _id: string; revenue: number; orders: string[] }>([
        {
          $match: {
            'orderItems.seller': seller,
            paymentStatus: "paid",
            createdAt: { $gte: start, $lte: end },
          },
        },
        {$unwind: "$orderItems"},
        {$match: {'orderItems.seller': seller}},
        {
          $group: {
            _id: dateGroupExpr,
            revenue: { $sum: "$orderItems.total" },
            orders: { $addToSet: "$_id" },
          },
        },
      ]).then((result) => 
         result.map((item) => ({
          _id: item._id,
          revenue: item.revenue,
          orders: item.orders.length,
        }))
      ),
      Order.aggregate<{ _id: null; revenue: number }>([
        {
          $match: {
            'orderItems.seller': seller,
            paymentStatus: "paid",
            createdAt: { $gte: prevStart, $lte: prevEnd },
          },
        },
        {$unwind: "$orderItems"},
        {$match: {'orderItems.seller': seller}},
        { $group: { _id: null, revenue: { $sum: "$orderItems.total" } } },
      ]),
    ]);

    const buckets = BuildEmptyBuckets(start, end, bucket);
    for (const data of grouped) {
      const bucket = buckets.get(data._id);
      if (bucket) {
        bucket.revenue = data.revenue;
        bucket.orders = data.orders;
      }
    }
    const series = Array.from(buckets.values());
    const {totalRevenue} = await SellerServices.getTotalRevenue(sellerId);
    const totalOrders = series.reduce((sum, point) => sum + point.orders, 0);
    const AverageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const prevRevenue = prevAggregate[0]?.revenue || 0;
    const revenueChangePercent =
      prevRevenue === 0
        ? totalRevenue > 0
          ? 100
          : 0
        : ((totalRevenue - prevRevenue) / prevRevenue) * 100;
    const peakPoint = series.reduce(
      (max, point) => (point.revenue > max.revenue ? point : max),
      series[0] ?? { label: "", date: "", revenue: 0, orders: 0 },
    );

    return {
      timeframe,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      AverageOrderValue: Number(AverageOrderValue.toFixed(1)),
      revenueChangePercent: Number(revenueChangePercent.toFixed(1)),
      series,
      peak: {
        label: peakPoint.label,
        date: peakPoint.date,
        revenue: peakPoint.revenue,
      },
    };
  },
  getRevenueGrowthOfPlatform: async (timeframe: AnalyticalDateTimeframe): Promise<AnalyticalData> => {
    const { start, end, bucket } = getRangeWindow(timeframe);
    
    const windowMe = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - windowMe);
    const prevEnd = new Date(start.getTime() - 1);

    const dateGroupExpr =
      bucket === "day"
        ? { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        : { $dateToString: { format: "%Y-%m", date: "$createdAt" } };

        const [grouped, prevAggregate] = await Promise.all([
      Order.aggregate<{ _id: string; revenue: number; orders: string[] }>([
        {
          $match: {
            paymentStatus: "paid",
            createdAt: { $gte: start, $lte: end },
          },
        },
        {$unwind: "$orderItems"},
        {
          $group: {
            _id: dateGroupExpr,
            revenue: { $sum: "$orderItems.total" },
            orders: { $addToSet: "$_id" },
          },
        },
      ]).then((result) => 
         result.map((item) => ({
          _id: item._id,
          revenue: item.revenue,
          orders: item.orders.length,
        }))
      ),
      Order.aggregate<{ _id: null; revenue: number }>([
        {
          $match: {
            paymentStatus: "paid",
            createdAt: { $gte: prevStart, $lte: prevEnd },
          },
        },
        {$unwind: "$orderItems"},
        { $group: { _id: null, revenue: { $sum: "$orderItems.total" } } },
      ])
    ]);
    
    const buckets = BuildEmptyBuckets(start, end, bucket);
    for (const data of grouped) {
      const bucket = buckets.get(data._id);
      if (bucket) {
        bucket.revenue = data.revenue;
        bucket.orders = data.orders;
      }
    }
    const series = Array.from(buckets.values());
    const totalRevenue = series.reduce((sum, point) => sum + point.revenue, 0);
    const totalOrders = series.reduce((sum, point) => sum + point.orders, 0);
    const AverageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const prevRevenue = prevAggregate[0]?.revenue || 0;
    const revenueChangePercent =
      prevRevenue === 0
        ? totalRevenue > 0
          ? 100
          : 0
        : ((totalRevenue - prevRevenue) / prevRevenue) * 100;
    const peakPoint = series.reduce(
      (max, point) => (point.revenue > max.revenue ? point : max),
      series[0] ?? { label: "", date: "", revenue: 0, orders: 0 },
    );

    return {
      timeframe,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      AverageOrderValue: Number(AverageOrderValue.toFixed(1)),
      revenueChangePercent: Number(revenueChangePercent.toFixed(1)),
      series,
      peak: {
        label: peakPoint.label,
        date: peakPoint.date,
        revenue: peakPoint.revenue,
      },
    };
  },
  getRevenueGrowthOfPlatform30Days: async (): Promise<AnalyticalData> => {
    const end = new Date();
    const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000); 
    const dateGroupExpr = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    const [grouped, prevAggregate] = await Promise.all([
      Order.aggregate<{ _id: string; revenue: number; orders: string[] }>([
        {
          $match: {
            paymentStatus: "paid",
            createdAt: { $gte: start, $lte: end },
          },
        },
        {$unwind: "$orderItems"},
        {
          $group: {
            _id: dateGroupExpr,
            revenue: { $sum: "$orderItems.total" },
            orders: { $addToSet: "$_id" },
          },
        },
      ]).then((result) => 
         result.map((item) => ({
          _id: item._id,
          revenue:  item.revenue,
          orders: item.orders.length,
        }))
      ),
      Order.aggregate<{ _id: null; revenue: number }>([
        {
          $match: {
            paymentStatus: "paid",
            createdAt: { $gte: new Date(start.getTime() - 30 * 24 * 60 * 60 * 1000), $lte: start },
          },
        },
        {$unwind: "$orderItems"},
        { $group: { _id: null, revenue: { $sum: "$orderItems.total" } } },
      ])
    ]);

    const buckets = BuildEmptyBuckets(start, end, "day");
    for (const data of grouped) {
      const bucket = buckets.get(data._id);
      if (bucket) {
        bucket.revenue = data.revenue;
        bucket.orders = data.orders;
      }
    }
    const series = Array.from(buckets.values());
    const totalRevenue = series.reduce((sum, point) => sum + point.revenue, 0);
    const totalOrders = series.reduce((sum, point) => sum + point.orders, 0);
    const AverageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const prevRevenue = prevAggregate[0]?.revenue || 0;
    const revenueChangePercent =
      prevRevenue === 0
        ? totalRevenue > 0
          ? 100
          : 0
        : ((totalRevenue - prevRevenue) / prevRevenue) * 100;
    const peakPoint = series.reduce(
      (max, point) => (point.revenue > max.revenue ? point : max),
      series[0] ?? { label: "", date: "", revenue: 0, orders: 0 },
    );

    return {
      timeframe: AnalyticalDateTimeframe.THIRTY_DAYS,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      AverageOrderValue: Number(AverageOrderValue.toFixed(1)),
      revenueChangePercent: Number(revenueChangePercent.toFixed(1)),
      series,
      peak: {
        label: peakPoint.label,
        date: peakPoint.date,
        revenue: peakPoint.revenue,
      },
    };
  }
}
