const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const cartRouter = require("./cart.routes");
const orderRouter = require("./order.routes");
const stripeRouter = require("./stripe.routes");

const init = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/checkout", stripeRouter);
};

module.exports = init;