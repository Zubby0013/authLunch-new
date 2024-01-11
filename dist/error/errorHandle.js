"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMessage = void 0;
const buildErrorMessage = (err, res) => {
    return res.status(404).json({
        name: err.name,
        message: err.message,
        success: err.success,
        status: err.status,
        stack: err.stack,
        error: err
    });
};
const handleErrorMessage = (err, req, res, next) => {
    return buildErrorMessage(err, res);
};
exports.handleErrorMessage = handleErrorMessage;
