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

app.post("/attendance_app", (req, res) => {
  const { Date, Time, Userid, Activity_type, Comments } = req.body;

  let sql = "";
  let values = [];

  // Determine the SQL query based on the activity type
  switch (Activity_type) {
    case "Punched In":
    case "Punched Out":
    case "lunchin":
    case "lunchout":
      sql =
        "INSERT INTO time_table (Userid, Date, Time, Activity_type, Comments) VALUES (?, ?, ?, ?, ?)";
      values = [Userid, Date, Time, Activity_type, Comments];
      break;
    case "breakin":
    case "breakout":
      sql =
        "INSERT INTO time_table (Userid, Date, Time, Activity_type, Comments) VALUES (?, ?, ?, ?, ?)";
      values = [Userid, Date, Time, Activity_type, Comments];
      break;
    default:
      return res.status(400).send("Invalid activity type");
  }

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data into database");
    } else {
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/alldatas", (req, res) => {
  const sql = "SELECT * FROM time_table";
  db.query(sql, (error, data) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.json(data);
    }
  });
});

// !    FOR RESEST PASSWORD THROUGH THE LINK
const port = 4023;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
