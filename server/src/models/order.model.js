import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          required: true,
        },
        rentalDays: {
          type: Number,
          required: true,
        },
      },
    ],

    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    rentalStartDate: {
      type: Date,
      required: true,
    },

    rentalEndDate: {
      type: Date,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["online", "cod"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["booked", "delivered", "returned", "cancelled"],
      default: "booked",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    isReturned: {
      type: Boolean,
      default: false,
    },

    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model("Order", orderSchema);
