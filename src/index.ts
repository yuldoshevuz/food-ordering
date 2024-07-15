import express from "express";
import environments from "./config/environments";
import connectDB from "./config/connect.db";
import router from "./routes";
import path from "path";

const bootstrap = async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static( path.join(__dirname, "public") ))
    app.use(router);

    connectDB()

    app.listen(environments.PORT, () => {
        console.log(`Server running on port: ${environments.PORT}`);
    });
};

bootstrap();
