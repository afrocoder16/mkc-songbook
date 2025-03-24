import { config } from "dotenv";
import { connect } from "./config/db.js";
import express from "express";
import apiRouter from "./routes/index.js";
import cors from "cors";
import "./config/nodemailer.config.js";
import "./config/passport.config.js";
import { MulterError } from "multer";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import initDb from "./init-db/init-db.js";

if (config().error) throw config().error;

const app = express();

morgan.token("error", (req) => req.error?.message || "");
morgan.token("fileerror", (req) => req.fileDeleteError?.message || "");

app.use(helmet());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :error :fileerror"
    )
);
app.use(
    cors({
        origin: process.env.CLIENT_URL.split(","),
    })
);
app.use(express.json());
app.use("/api", apiRouter);

app.use(async (err, req, res, _next) => {
    if (req.file)
        fs.unlink(req.file.path, (err) => {
            if (err) req.fileDeleteError = err;
        });
    let { message, statusCode = 500 } = err;
    if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE")
        statusCode = 400;
    if (statusCode === 500) {
        if (err.internalError) req.error = err.internalError;
        else req.error = err;
        message = "An unexpected error occurred.";
    }
    res.status(statusCode).json({ message });
});

connect(process.env.DB_URI).then(async () => {
    await initDb({
        email: process.env.DEFAULT_ADMIN_EMAIL,
        name: process.env.DEFAULT_ADMIN_NAME,
        photoLink: process.env.DEFAULT_ADMIN_PHOTO_LINK,
    });
    app.listen(process.env.PORT, () =>
        console.log("Server started on port: ", process.env.PORT)
    );
});
