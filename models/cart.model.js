const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        { 
            product: { type: Object },
        }
    ],
    qty: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);