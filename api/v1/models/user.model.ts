import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email:String,
    password: String,
    token:String,
    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    deletedAt: Date,
    restoreAt: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema, "users");
// console.log(productSchema);
export default  User;
