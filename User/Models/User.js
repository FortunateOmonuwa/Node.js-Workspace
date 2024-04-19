const mongoose = require("mongoose");
const { Schema } = mongoose;
const nameRegex = /^[a-zA-Z\s]+$/;
const usernameRegex = /^[\w]+$/;
const phoneRegex = /^\d{11}$/;
const passwordRegex = /^(?=.*?[#?!@$%^&*-]).{7,}$/;
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return nameRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid first name!`,
      },
    },
    lastname: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return nameRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid last name!`,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Regex to allow only alphanumeric characters and underscores

          return usernameRegex.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid username! Only only alphanumeric characters and underscores are allowed `,
      },
    },
    phonenumber: {
      type: String,
      required: true,

      unique: true,
      validate: {
        validator: function (value) {
          // Regex to match a valid phone number format (e.g., 1234567890)

          return phoneRegex.test(String(value));
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    age: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          // Check if the age is a positive integer
          return Number.isInteger(value) && value >= 18;
        },
        message: (props) => `${props.value} is not a valid age!`,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    // account: {
    //   accountnumber: {
    //     type: String,
    //     required: false,
    //     unique: true,
    //   },
    //   accountname: {
    //     type: String,
    //     required: false,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", (next) => {
//   //   const randomGeneratedNumber =
//   //     Math.floor(Math.random() * 9000000000) + 1000000000;
//   //   const randomAccount = randomGeneratedNumber.toString().padStart(12, "0");
//   const accountNumber = Number(this.phonenumber);
//   console.log("accountNumber:", accountNumber);

//   if (accountNumber.length < 10) {
//     return next(new Error("Account Number is not 10 digits "));
//   }

//   const accountName = `${this.firstname} ${this.lastname}`.trim();
//   console.log("accountName:", accountName);

//   this.account.accountnumber = String(accountNumber);
//   this.account.accountname = accountName;
//   console.log("this.account.accountnumber:", this.account.accountnumber);
//   console.log("this.account.accountname:", this.account.accountname);

//   next();
// });
const { model: UserModel } = mongoose;
const User = UserModel("User", UserSchema);
module.exports = {
  User,
  emailRegex,
  nameRegex,
  passwordRegex,
  usernameRegex,
  phoneRegex,
};
