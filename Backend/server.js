require("dotenv").config();
const express = require("express");
const db = require("./app/node-mysql-server/db-con");
const app = express();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cors = require("cors");
// const { hash } = require("bcrypt");

app.use(cors());
app.use(express.json());
// const { GenericResponse, ResponseStatus } = require("./GenericResponse");
// const ErrorMessage = require("./ErrorMessage");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./app/SwaggerSpecs/swagger.json");
// const  swaggerJsDoc= require("swagger-jsdoc");

// const authRouter = require("./app/routes/auth");
// app.use("/",authRouter)

const routePath = require("./app/controllers/routes/auth");
const { GenericResponse, ResponseStatus } = require("./GenericResponse");

// !  FOR CREATE
app.use("/user/create", routePath);
// !  FOR LOGIN
app.use("/user/login", routePath);
// !  FOR AUTH
app.use("/", routePath);
// !  FOR RESET PASS
app.use("/user/reset", routePath);

// !  FOR FORGOTPASS
app.use("/user/forgot", routePath);
// !  Fetching single data
app.use("/singleData", routePath);

// !  FOR CLEAR ALL THE ENTRIES(FOR CHECKING)
// app.use("/user/clear", require("./app/routes/path"));

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
// *  IN THIS LINE CORS IS USED TO PASS THE DATA TO REACT

// *  THIS IS IMPORTANT ONE FOR API CATCH

// !  FETCH ALL
app.use("/user/fetch", routePath);

app.use("/attendance_app", routePath);

app.use("/alldatas", routePath);

app.use("/GetActivity", routePath);

// !    FOR RESEST PASSWORD THROUGH THE LINK
const port = process.env.PORT || 4023;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
