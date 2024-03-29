import { Application, NextFunction, Request, Response } from "express";
import {  mainError } from "./error/mainError";
import { handleErrorMessage } from "./error/errorHandle";
import { HTTP } from "./interface/enums";
import auth from "./router/userRouter" ;
import passport from "passport";
import userModel from "./model/userModel";
import Google from "passport-google-oauth20";

const GoogleStrategy = Google.Strategy;


export const mainApp = (app:Application)=>{
    try {
       app.use(`/api/v1/user`,auth);

     app.get("/",(req:Request, res:Response)=>{
         try {
             const user = req.user;
             console.log("finally:",req.user);
             return res.status(200).json({
                 message: "welcome to my authLunch",
                 data: user
                })
            } catch (error:any) {
                return res.status(404).json({
                    message: "default error",
                    data: error.message
                })
            }
        });

        app.get("/home", (req: any, res: Response): Response => {
          try {
            if (req.user) {
              const user = req.user;
              console.log("finally: ", req.user);
              return res.status(200).json({
                message: "Awesome API",
                data: user,
              });
            } else {
              return res.status(404).json({
                message: "something went wrong",
              });
            }
          } catch (error) {
            return res.status(404).json({
              message: "Error",
            });
          }
        });

        passport.use(
            new GoogleStrategy(
              {
                clientID:
                  "377807975055-ui03iq65puopj600r2k37m0mp37595u3.apps.googleusercontent.com",
                clientSecret: "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",
                callbackURL: "/auth/google/callback",
              },
              async function (accessToken, refreshToken, profile: any, cb) {
                console.log(profile);
      
                // const user = await userModel.create({
                //   email: profile?.emails[0]?.value,
                //   password: "",
                //   verify: profile?.emails[0]?.verified,
                //   token: "",
                //   status: "admin",
                //   schoolCode: Math.floor(Math.random() * 112233).toString(),
                // });
                const user ={
                  email: "cyprianzubby@gmail.com",
                  name: "Nzube"
                }
                console.log(user)
      
                return cb(null, user);
              }
            )
          );
        
        app.all("*",(req:Request, res:Response, next:NextFunction)=>{
            next(
                new mainError({
                    name: "Route Error",
                    message: `This endPoint you entered ${req.originalUrl} is not support`,
                    status: HTTP.BAD_REQUEST,
                    success: false
                }),
                )
            });

     app.use(handleErrorMessage);
   } catch (error) {
    return error
   }
}
console.log(mainApp)