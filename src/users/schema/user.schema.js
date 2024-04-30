import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slug: { type: String, required: true,},
    phone: { type: Number, required: true ,unique: true},
    school: { type: String },
    _isAdmin: { type: Boolean, default: false },
    _isSuper: { type: Boolean, default: false },
    _isAdmin_confirm: { type: Boolean, default: false },
    _isBlocked: { type: Boolean, default: false },
    _isVerify: { type: Boolean, default: false },
    _isActive: { type: Boolean, default: false },
    changePasswordAt: { type: Date },
    img: { type: Object ,default:'' }
  },
  { timestamps: true }
);

userschema.pre( "save", function(){
  this.password = bcrypt.hashSync(this.password , +process.env.SALT)
})
userschema.pre( "findOneAndUpdate", function(){
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password , +process.env.SALT)
  }
})

const User = mongoose.model("User", userschema);
export default User;
 