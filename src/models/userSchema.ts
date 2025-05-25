import mongoose, { Schema, models } from "mongoose";

import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      // match: [
      //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      //   "Username invalid. It should be 8–20 characters, only letters, numbers, underscores, or dots, and not start or end with _ or .",
      // ],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      // match: [
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Password must be at least 8 characters, include a letter, number, and special character",
      // ],
    },

    profileImage: {
      type: String,
      unique: [true, "please use another image where your face is visible"],
      required: false,
    },
    Age: {
      type: Number,
      requires: false,
      min: [13, "Age must be at least 13"],
      max: [120, "Age must be less than 120"],
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    socialhandle: {
      instagram: {
        type: String,
        default: "",
        trim: true,
      },
      facebook: {
        type: String,
        default: "",
        trim: true,
      },
      whatsapp: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },

  { timestamps: true }
);

// UserSchema.index({ email: 1 });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
export default mongoose.model("User", UserSchema);
