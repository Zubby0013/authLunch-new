import { Router } from "express";
import { changeUserPassword, createAdmin, createDispatcher, createUser, createVendor, getAllUser, getAllUsers, getCookieUser, logOutUsers, resetUserPassword, signinUser, verifyUser } from "../controller/userController";
import validator from "../utils/validator";
import { passwordValidator, registerValidator } from "../utils/userValidator";
import { authorization } from "../utils/authorization";
import { authRized } from "../utils/authorized";

const router:Router = Router();

router.route("/create-user").post(validator(registerValidator),createUser);
router.route("/create-admin").post(validator(registerValidator),createAdmin);
router.route("/create-vendor").post(validator(registerValidator),createVendor);
router.route("/create-dispatcher").post(validator(registerValidator),createDispatcher);

router.route("/sign-in-user").post(signinUser);

router.route("/all-users").get(authorization, getAllUsers);

router.route("/all-users").get(authRized, getAllUser);

router.route("/verify-user").patch(verifyUser);

router.route("/logout-user").get(logOutUsers);

router.route("/user-cookie").get(getCookieUser);

router.route("/reset-user-password").patch(resetUserPassword);
router
  .route("/change-user-password/:userID")
  .patch(validator(passwordValidator), changeUserPassword);

export default router;