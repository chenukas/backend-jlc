const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    source: { type: Object, required: true },
    currency: { type: String, default: "aud" },
    status: { type: String, default: "not succeeded" },
    receipt_url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);