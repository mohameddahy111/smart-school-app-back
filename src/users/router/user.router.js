import express from "express";
import {
  addUser,
  changePassword,
  forgetPassword,
  getUserDetils,
  getUserInfo,
  login,
  setSettingByAdmin,
  updateUser,
  userLogout,
  verfiyemail,
  getAllStudents,
  getNewStudent
} from "../controller/user.controller.js";
import { auth } from "../../middleware/auth.js";
import { rolles } from "../../middleware/rolles.js";
import { validetor } from "../../middleware/valitetor.js";
import {
  adduserValidation,
  loginValidation
} from "../validtion/user.validtion.js";
import { deleteItem, getAll } from "../../utils/helper/general.js";
import { uploadCloud } from "../../middleware/cloudinero.js";
import User from "../schema/user.schema.js";

const router = express.Router();
router.get("/students", getAllStudents);
router.get("/verfiy/:id", verfiyemail);
router.get("/userInfo", getUserInfo);
router.get("/admin/user/:userId", getUserDetils);
router.get("/admin/new_student", getNewStudent);

router.post(
  "/",
  uploadCloud().single("img"),
  // validetor(adduserValidation),
  addUser
);
router.post("/login", login);

router.patch("/setting/blocked", auth, rolles(["admin"]), setSettingByAdmin);
router.patch("/logout/:id", auth, userLogout);
router.patch("/forget_password", validetor(loginValidation), forgetPassword);
router.patch("/change_password/:id", changePassword);
router.patch("/", auth, validetor(adduserValidation), updateUser);
router.delete("/:id", auth, rolles(["admin"]), deleteItem(User));

export default router;
