const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");

const init = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
};

module.exports = init;