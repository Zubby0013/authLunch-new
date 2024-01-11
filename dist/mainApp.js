"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const mainError_1 = require("./error/mainError");
const errorHandle_1 = require("./error/errorHandle");
const enums_1 = require("./interface/enums");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    app.use(`/api/v1/user`, userRouter_1.default);
    try {
        app.get("/", (req, res) => {
            try {
                return res.status(201).json({
                    message: "welcome to my authLunch"
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "default error",
                    data: error.message
                });
            }
        });
        app.all("*", (req, res, next) => {
            next(new mainError_1.mainError({
                name: "Route Error",
                message: `This endPoint you entered ${req.originalUrl} is not support`,
                status: enums_1.HTTP.BAD_REQUEST,
                success: false
            }));
        });
        app.use(errorHandle_1.handleErrorMessage);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
console.log(exports.mainApp);
