

export interface AvgOrderValueResponse {
    success: boolean;
    data: {
        avgOrderValue: number;
        changePercent: number;
        message: string;
    };
}