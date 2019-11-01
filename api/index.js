import express from "express";
import bodyParser from "body-parser";
import config from "dotenv";

import studentRoutes from "./server/routes/StudentRoutes";
import classRoutes from "./server/routes/ClassRoutes";
import formRoutes from "./server/routes/FormRoutes";
import schoolRoutes from "./server/routes/SchoolRoutes";
import teacherRoutes from "./server/routes/TeacherRoutes";
import formGroupRoutes from "./server/routes/FormGroupRoutes";


config.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;


app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/forms", formRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/formgroups", formGroupRoutes);
app.use("/api/v1/teachers", teacherRoutes);

// when a random route is inputed
app.get("*", (req, res) => res.status(200).send({
    message: "Welcome to this API.  Wildcard route activated."
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
