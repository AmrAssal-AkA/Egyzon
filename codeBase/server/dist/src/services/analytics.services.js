"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytical = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const analyticHelpers_1 = require("../utils/analyticHelpers");
exports.Analytical = {
    async getSellerAnalytics(sellerId, timeframe) {
        const { start, end, bucket } = (0, analyticHelpers_1.getRangeWindow)(timeframe);
        const windowMe = end.getTime() - start.getTime();
        const prevStart = new Date(start.getTime() - windowMe);
        const prevEnd = new Date(start.getTime() - 1);
        const seller = new mongoose_1.default.Types.ObjectId(sellerId);
        const dateGroupExpr = bucket === "day"
            ? { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
            : { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        const [grouped, prevAggregate] = await Promise.all([
            orderModel_1.default.aggregate([
                {
                    $match: {
                        'orderItems.seller': seller,
                        paymentStatus: "paid",
                        createdAt: { $gte: start, $lte: end },
                    },
                },
                { $unwind: "$orderItems" },
                { $match: { 'orderItems.seller': seller } },
                {
                    $group: {
                        _id: dateGroupExpr,
                        revenue: { $sum: "$orderItems.total" },
                        orders: { $addToSet: "$_id" },
                    },
                },
            ]).then((result) => result.map((item) => ({
                _id: item._id,
                revenue: item.revenue,
                orders: item.orders.length,
            }))),
            orderModel_1.default.aggregate([
                {
                    $match: {
                        'orderItems.seller': seller,
                        paymentStatus: "paid",
                        createdAt: { $gte: prevStart, $lte: prevEnd },
                    },
                },
                { $unwind: "$orderItems" },
                { $match: { 'orderItems.seller': seller } },
                { $group: { _id: null, revenue: { $sum: "$orderItems.total" } } },
            ]),
        ]);
        console.log("Grouped Data:", grouped);
        const buckets = (0, analyticHelpers_1.BuildEmptyBuckets)(start, end, bucket);
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
        const revenueChangePercent = prevRevenue === 0
            ? totalRevenue > 0
                ? 100
                : 0
            : ((totalRevenue - prevRevenue) / prevRevenue) * 100;
        const peakPoint = series.reduce((max, point) => (point.revenue > max.revenue ? point : max), series[0] ?? { label: "", date: "", revenue: 0, orders: 0 });
        console.log("Analytical Data:", {
            timeframe,
            totalRevenue,
            totalOrders,
            AverageOrderValue,
            revenueChangePercent,
            series,
            peak: peakPoint,
        });
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
};
//# sourceMappingURL=analytics.services.js.map