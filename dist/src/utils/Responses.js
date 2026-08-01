"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, statusCode, message, error) => {
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
};
exports.sendErrorResponse = sendErrorResponse;
//# sourceMappingURL=Responses.js.map