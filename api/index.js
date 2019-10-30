import express from "express";
import bodyParser from "body-parser";
import config from "dotenv";
import studentRoutes from "./server/routes/StudentRoutes";
import classRoutes from "./server/routes/ClassRoutes";

config.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;


app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/class", classRoutes);

// when a random route is inputed
app.get("*", (req, res) => res.status(200).send({
    message: "Welcome to this API.  Wildcard route activated."
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
